package com.buy.together.controller;

import java.util.List;

import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.buy.together.domain.Board;
import com.buy.together.service.FaqService;


@RestController
@RequestMapping("/restCustomerCenter/*")
public class FaqRestController {

	private static final Logger logger = LoggerFactory.getLogger(FaqRestController.class);

	@Inject
	private FaqService service;

	/****** 전체보기 리스트 ******/
	@RequestMapping(value ="faqAllList", method = RequestMethod.GET)
	public ResponseEntity<List<Board>> requestAllList(){

		ResponseEntity<List<Board>> entity = null;

		try{
			logger.info("여기다.");

			entity = new ResponseEntity<List<Board>>(service.faqAllList() , HttpStatus.OK);

		}catch(Exception e){

			e.printStackTrace();
			entity = new ResponseEntity<List<Board>>(HttpStatus.BAD_REQUEST);

		}

		return entity;
	}

	/****** 회원관련 리스트 ******/
	@RequestMapping(value ="faqUserList", method = RequestMethod.GET)
	public ResponseEntity<List<Board>> requestUserList(){

		ResponseEntity<List<Board>> entity = null;

		try{
			logger.info("회원관련.");

			entity = new ResponseEntity<List<Board>>(service.faqUserList() , HttpStatus.OK);

		}catch(Exception e){

			e.printStackTrace();
			entity = new ResponseEntity<List<Board>>(HttpStatus.BAD_REQUEST);

		}

		return entity;
	}

	/****** 사냥관련 리스트 ******/
	@RequestMapping(value ="faqBuyList", method = RequestMethod.GET)
	public ResponseEntity<List<Board>> requestBuyList(){

		ResponseEntity<List<Board>> entity = null;

		try{
			logger.info("사냥관련.");

			entity = new ResponseEntity<List<Board>>(service.faqBuyList() , HttpStatus.OK);

		}catch(Exception e){

			e.printStackTrace();
			entity = new ResponseEntity<List<Board>>(HttpStatus.BAD_REQUEST);

		}

		return entity;
	}

	/****** 정보관련 리스트 ******/
	@RequestMapping(value ="faqInfoList", method = RequestMethod.GET)
	public ResponseEntity<List<Board>> requestInfoList(){

		ResponseEntity<List<Board>> entity = null;

		try{
			logger.info("정보관련.");

			entity = new ResponseEntity<List<Board>>(service.faqInfoList() , HttpStatus.OK);

		}catch(Exception e){

			e.printStackTrace();
			entity = new ResponseEntity<List<Board>>(HttpStatus.BAD_REQUEST);

		}

		return entity;
	}

	/****** 고객센터 리스트 ******/
	@RequestMapping(value ="faqCenterList", method = RequestMethod.GET)
	public ResponseEntity<List<Board>> requestCenterList(){

		ResponseEntity<List<Board>> entity = null;

		try{
			logger.info("고객센터.");

			entity = new ResponseEntity<List<Board>>(service.faqCenter() , HttpStatus.OK);

		}catch(Exception e){

			e.printStackTrace();
			entity = new ResponseEntity<List<Board>>(HttpStatus.BAD_REQUEST);

		}

		return entity;
	}
}
