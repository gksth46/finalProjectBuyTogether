package com.buy.together.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.buy.together.domain.BuyTogether;
import com.buy.together.domain.BuyTogetherAddress;
import com.buy.together.domain.Category;
import com.buy.together.domain.HuntingStatus;
import com.buy.together.domain.HuntingType;
import com.buy.together.domain.ListSearchCriteria;
import com.buy.together.domain.PageMaker;
import com.buy.together.dto.BuyTogetherDTO;
import com.buy.together.service.BuyTogetherService;
import com.buy.together.util.UploadFileUtils;

@RestController
@RequestMapping("/restBuytogether/*")
public class BuyTogetherRestController {

	private static final Logger logger = LoggerFactory.getLogger(BuyTogetherRestController.class);

	@Inject
	private BuyTogetherService service;
	
	//유저의 관심 카테고리 등록 여부 확인
	@RequestMapping(value = "userInterest", method = RequestMethod.POST)
	public ResponseEntity<Integer> requestUserInterest(int user_number) {

		ResponseEntity<Integer> entity = null;
		
		try {
			entity = new ResponseEntity<>(service.userInterest(user_number), HttpStatus.OK);
		} catch(Exception e) {
			e.printStackTrace();
			entity = new ResponseEntity<>(HttpStatus.BAD_REQUEST);

		}
		return entity;
	}

	@RequestMapping(value = "maplistBuyTogether", method = RequestMethod.POST)
	public ResponseEntity<Map<String, Object>> requestMapListBuyTogether(@RequestBody ListSearchCriteria scri) {

		ResponseEntity<Map<String, Object>> entity = null;

		try {
			
			PageMaker pageMaker = new PageMaker();
			pageMaker.setCri(scri);
			
			int searchBuyTogetherCount = service.searchBuyTogetherCount(scri);
			pageMaker.setTotalCount(searchBuyTogetherCount);
			
			Map<String, Object> map = new HashMap<String, Object>();
			List<BuyTogetherDTO> searchBuyTogether = service.searchBuyTogetherList(scri);
			map.put("searchBuyTogether", searchBuyTogether);
			map.put("pageMaker", pageMaker);
			
			entity = new ResponseEntity<>(map, HttpStatus.OK);

		} catch (Exception e) {

			e.printStackTrace();
			entity = new ResponseEntity<>(HttpStatus.BAD_REQUEST);

		}
		return entity;
	}
	
	@RequestMapping(value = "listBuyTogether", method = RequestMethod.POST)
	public ResponseEntity<Map<String, Object>> requestListBuyTogether(@RequestBody ListSearchCriteria scri) {

		ResponseEntity<Map<String, Object>> entity = null;

		try {
			
			PageMaker pageMaker = new PageMaker();
			pageMaker.setCri(scri);
			
			int searchBuyTogetherCount = service.searchBuyTogetherCount(scri);
			pageMaker.setTotalCount(searchBuyTogetherCount);
			
			Map<String, Object> map = new HashMap<String, Object>();
			List<BuyTogetherDTO> searchBuyTogether = service.searchBuyTogetherList(scri);
			map.put("searchBuyTogether", searchBuyTogether);
			map.put("pageMaker", pageMaker);
			
			entity = new ResponseEntity<>(map, HttpStatus.OK);

		} catch (Exception e) {

			e.printStackTrace();
			entity = new ResponseEntity<>(HttpStatus.BAD_REQUEST);

		}
		return entity;
	}

	@RequestMapping(value = "listCategory", method = RequestMethod.GET)
	public ResponseEntity<List<Category>> requestListCategory() {

		ResponseEntity<List<Category>> entity = null;

		try {

			entity = new ResponseEntity<>(service.categoryList(), HttpStatus.OK);

		} catch (Exception e) {

			e.printStackTrace();
			entity = new ResponseEntity<>(HttpStatus.BAD_REQUEST);

		}
		return entity;
	}

	@RequestMapping(value = "listHuntingType", method = RequestMethod.GET)
	public ResponseEntity<List<HuntingType>> requestListHuntingType() {

		ResponseEntity<List<HuntingType>> entity = null;

		try {

			entity = new ResponseEntity<>(service.huntingTypeList(), HttpStatus.OK);

		} catch (Exception e) {

			e.printStackTrace();
			entity = new ResponseEntity<>(HttpStatus.BAD_REQUEST);

		}
		return entity;
	}
	
	@RequestMapping(value = "listHuntingStatus", method = RequestMethod.GET)
	public ResponseEntity<List<HuntingStatus>> requestListHuntingStatus() {

		ResponseEntity<List<HuntingStatus>> entity = null;

		try {

			entity = new ResponseEntity<>(service.huntingStatusList(), HttpStatus.OK);

		} catch (Exception e) {

			e.printStackTrace();
			entity = new ResponseEntity<>(HttpStatus.BAD_REQUEST);

		}
		return entity;
	}

	@ResponseBody //사진전송, 경로생성
	@RequestMapping(value="/uploadAjax", method=RequestMethod.POST, produces="text/plain;charset=UTF-8")
	public ResponseEntity<String> uploadAjax(HttpServletRequest request, MultipartFile file) throws Exception {

		HttpSession session = request.getSession();
		String uploadPath = session.getServletContext().getRealPath("/") + "/resources/upload";
		System.out.println(uploadPath);
		
		return new ResponseEntity<>(UploadFileUtils.uploadFile(uploadPath, file.getOriginalFilename(), file.getBytes()),HttpStatus.CREATED);

	}
	
	@ResponseBody
	@RequestMapping("/displayFile")  //사진 화면에 보이기
	public ResponseEntity<byte[]> displayFile(HttpServletRequest request, String fileName)throws Exception {
		
		HttpSession session = request.getSession();
		String uploadPath = session.getServletContext().getRealPath("/") + "/resources/upload";
		InputStream in = null;
		ResponseEntity<byte[]> entity = null;
		
		String formatName = fileName.substring(fileName.lastIndexOf(".")+1);
		HttpHeaders headers = new HttpHeaders();
		
		try {
			
			MediaType type;
			if(formatName.toUpperCase().equals("JPG")) {
				type = MediaType.IMAGE_JPEG;
			} else if(formatName.toUpperCase().equals("GIF")) {
				type = MediaType.IMAGE_GIF;
			} else {
				type = MediaType.IMAGE_PNG;
			}
			
			in = new FileInputStream(uploadPath + fileName);
			headers.setContentType(type);
			
			entity = new ResponseEntity<byte[]>(IOUtils.toByteArray(in), headers, HttpStatus.CREATED);
			
		} catch(Exception e) {
			
			e.printStackTrace();
			entity = new ResponseEntity<byte[]>(HttpStatus.BAD_REQUEST);
		} finally {
			in.close();
		}
		
		return entity;
	}
	
	@ResponseBody //사진삭제
	@RequestMapping(value="/deleteFile", method=RequestMethod.POST)
	public ResponseEntity<String> deleteFile(HttpServletRequest request, String fileName) {
		
		HttpSession session = request.getSession();
		String uploadPath = session.getServletContext().getRealPath("/") + "/resources/upload";
		logger.info("delete file: " + fileName);
		
		String front = fileName.substring(0,12);
		String end = fileName.substring(14);
		
		new File(uploadPath + (front+end).replace('/', File.separatorChar)).delete();
		new File(uploadPath + fileName.replace('/', File.separatorChar)).delete();
		
		return new ResponseEntity<String>("deleted", HttpStatus.OK);
	}
	
	@RequestMapping(value = "write", method = RequestMethod.POST) //같이사냥 글쓰기
	public ResponseEntity<Integer> RequestWrite(BuyTogether buytogether) {

		ResponseEntity<Integer> entity = null;

		try {
			int buytogether_number = service.buyTogetherWrite(buytogether);
			entity = new ResponseEntity<>(buytogether_number, HttpStatus.OK);

		} catch (Exception e) {

			e.printStackTrace();
			entity = new ResponseEntity<>(HttpStatus.BAD_REQUEST);

		}

		return entity;
	}
	
	@RequestMapping(value = "addressWrite", method = RequestMethod.POST) //같이사냥 글쓰기시 주소 저장
	public ResponseEntity<String> RequestInsertAddress(BuyTogetherAddress buytogetherAddress) {

		ResponseEntity<String> entity = null;
		try {
			service.buyTogetherWriteAddress(buytogetherAddress);
			entity = new ResponseEntity<>("success", HttpStatus.OK);

		} catch (Exception e) {

			e.printStackTrace();
			entity = new ResponseEntity<>(HttpStatus.BAD_REQUEST);

		}

		return entity;
	}
	
}