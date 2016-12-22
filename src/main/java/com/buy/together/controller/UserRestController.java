package com.buy.together.controller;

import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.buy.together.domain.User;
import com.buy.together.dto.UserDTO;
import com.buy.together.service.UserService;

@RestController
@RequestMapping("/restUser")
public class UserRestController {

	@Inject
	private UserService userService;	
	private static final Logger logger = LoggerFactory.getLogger(UserRestController.class);
	
	//닉네임 중복 확인
	@RequestMapping(value="/nicknameCheck", method = RequestMethod.POST)
	public ResponseEntity<String> requestNickNameCheck(String nickname) {
		
		ResponseEntity<String> entity = null;
		String isExist = null;
		
		try {
			isExist = userService.checkNickname(nickname);
			entity = new ResponseEntity<String>(isExist, HttpStatus.OK); // HttpStatus.OK == 200
		} catch(Exception e) {
			e.printStackTrace();
			entity = new ResponseEntity<String>(isExist, HttpStatus.BAD_REQUEST); // HttpStatus.BAD_REQUEST == 400
		}
		
		return entity;
		
	}
	
	//필수 정보 DB 저장
	@RequestMapping(value="/registBasicInfo", method = RequestMethod.POST)
	public ResponseEntity<String> requestBasicInfo(@RequestBody UserDTO userDTO) {
		
		ResponseEntity<String> entity = null;
		
		try {
			userService.registBasicInfo(userDTO);
			entity = new ResponseEntity<String>("success", HttpStatus.OK); // HttpStatus.OK == 200
		} catch(Exception e) {
			e.printStackTrace();
			entity = new ResponseEntity<String>("fail", HttpStatus.BAD_REQUEST); // HttpStatus.BAD_REQUEST == 400
		}
		
		return entity;
		
	}
	
	//회원 DB 삭제
	@RequestMapping(value="/remove", method = RequestMethod.POST)
	public ResponseEntity<String> requestBasicInfo(@RequestBody User user) {
		
		ResponseEntity<String> entity = null;
		String result = null;
		
		try {
			
			if(user.getPw() != null) { //같이사냥 회원 탈퇴라면,
				
				result = userService.removeBUser(user);
				
			} else { //페이스북/네이버 회원 탈퇴라면,
				
				result = userService.removeEUser(user);
				
			}
			
			entity = new ResponseEntity<String>(result, HttpStatus.OK); // HttpStatus.OK == 200
			
		} catch(Exception e) {
			e.printStackTrace();
			entity = new ResponseEntity<String>(result, HttpStatus.BAD_REQUEST); // HttpStatus.BAD_REQUEST == 400
		}
		
		return entity;
		
	}
	
}
