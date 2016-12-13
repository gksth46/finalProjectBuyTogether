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
import com.buy.together.service.LoginService;

@RestController
@RequestMapping("/login")
public class LoginRestController {

	@Inject
	private LoginService loginService;	
	private static final Logger logger = LoggerFactory.getLogger(LoginRestController.class);
	
	@RequestMapping(value="/buyTogetherLogin", method = RequestMethod.POST)
	public ResponseEntity<User> buyTogetherLogin(@RequestBody User user) {
		
		ResponseEntity<User> entity = null;
		User userInfo = user;
		
		try {
			userInfo = loginService.buyTogetherLogin(user);
			entity = new ResponseEntity<User>(userInfo, HttpStatus.OK); // HttpStatus.OK == 200
		} catch(Exception e) {
			e.printStackTrace();
			entity = new ResponseEntity<User>(userInfo, HttpStatus.BAD_REQUEST); // HttpStatus.BAD_REQUEST == 400
		}
		
		return entity;
		
	}
	
	@RequestMapping(value="/externalLogin", method = RequestMethod.POST)
	public ResponseEntity<User> externalLogin(@RequestBody User user) {
		
		logger.info("externalLogin in");
		ResponseEntity<User> entity = null;
		User userInfo = user;
		
		try {
			userInfo = loginService.externalLogin(user);
			entity = new ResponseEntity<User>(userInfo, HttpStatus.OK); // HttpStatus.OK == 200
		} catch(Exception e) {
			e.printStackTrace();
			entity = new ResponseEntity<User>(userInfo, HttpStatus.BAD_REQUEST); // HttpStatus.BAD_REQUEST == 400
		}
		logger.info(entity.toString());
		return entity;
		
	}
	
	@RequestMapping(value="/regist", method = RequestMethod.POST)
	public ResponseEntity<String> registUser(@RequestBody User user) {
		logger.info("registUser in");
		ResponseEntity<String> entity = null;
		
		try {
			loginService.regist(user);
			entity = new ResponseEntity<String>("success", HttpStatus.OK); // HttpStatus.OK == 200
		} catch(Exception e) {
			e.printStackTrace();
			entity = new ResponseEntity<String>("fail", HttpStatus.BAD_REQUEST); // HttpStatus.BAD_REQUEST == 400
		}
		
		return entity;
		
	}

	@RequestMapping(value = "/state", method = RequestMethod.GET)
	public String requestNaverLoginState(HttpSession session) {
		
		SecureRandom random = new SecureRandom();
		String state = new BigInteger(130, random).toString(32);     //토큰을 생성합니다.
		session.setAttribute("state", state);      //세션에 토큰을 저장합니다.
		
		return state;

	}

}
