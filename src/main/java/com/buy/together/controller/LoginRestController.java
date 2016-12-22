package com.buy.together.controller;

import java.math.BigInteger;
import java.security.SecureRandom;

import javax.inject.Inject;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.buy.together.domain.User;
import com.buy.together.dto.LoginDTO;
import com.buy.together.service.LoginService;

@RestController
@RequestMapping("/restLogin")
public class LoginRestController {

	@Inject
	private LoginService loginService;	
	private static final Logger logger = LoggerFactory.getLogger(LoginRestController.class);
	
	//회원 및 관리자 로그인 검사
	@RequestMapping(value="/buyTogetherLogin", method = RequestMethod.POST)
	public ResponseEntity<LoginDTO> buyTogetherLogin(@RequestBody User user) {

		ResponseEntity<LoginDTO> entity = null;
		LoginDTO userInfo = null;

		try {
			userInfo = loginService.buyTogetherLogin(user);
			entity = new ResponseEntity<LoginDTO>(userInfo, HttpStatus.OK); // HttpStatus.OK == 200
		} catch(Exception e) {
			e.printStackTrace();
			entity = new ResponseEntity<LoginDTO>(userInfo, HttpStatus.BAD_REQUEST); // HttpStatus.BAD_REQUEST == 400
		}

		return entity;
		
	}
	
	//페이스북 로그인 검사
	@RequestMapping(value="/facebookLogin", method = RequestMethod.POST)
	public ResponseEntity<User> externalLogin(@RequestBody User user) {
		
		logger.info("facebookLogin in");
		ResponseEntity<User> entity = null;
		User userInfo = user;
		
		try {
			userInfo = loginService.facebookLogin(user);
			entity = new ResponseEntity<User>(userInfo, HttpStatus.OK); // HttpStatus.OK == 200
		} catch(Exception e) {
			e.printStackTrace();
			entity = new ResponseEntity<User>(userInfo, HttpStatus.BAD_REQUEST); // HttpStatus.BAD_REQUEST == 400
		}

		return entity;
		
	}

	//네이버 로그인 API 토큰 생성
	@RequestMapping(value = "/state", method = RequestMethod.GET)
	public String requestNaverLoginState(HttpSession session) {
		
		SecureRandom random = new SecureRandom();
		String state = new BigInteger(130, random).toString(32); //토큰을 생성
		session.setAttribute("state", state); //세션에 토큰 저장
		
		return state;

	}

}
