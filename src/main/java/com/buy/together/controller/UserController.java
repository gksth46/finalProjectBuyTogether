package com.buy.together.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/user")
public class UserController {
	
	private static final Logger logger = LoggerFactory.getLogger(LoginController.class);
	
	//같이사냥 회원 회원탈퇴 화면 호출
	@RequestMapping(value = "/Bsignout", method = RequestMethod.GET)
	public String requestBUserSignout() throws Exception {
		
		return "/views/user/buyTogetherUserSignout";
		
	}
	
	//로그인 화면 호출
	@RequestMapping(value = "/Esignout", method = RequestMethod.GET)
	public String requestEUserSignout() throws Exception {
		
		return "/views/user/externalUserSignout";
		
	}
	
}
