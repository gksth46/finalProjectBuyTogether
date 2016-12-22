package com.buy.together.controller;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.buy.together.domain.User;
import com.buy.together.service.LoginService;

@Controller
@RequestMapping("/login")
public class LoginController {

	private static final Logger logger = LoggerFactory.getLogger(LoginController.class);
	
	@Inject
	private LoginService loginService;
	
	//로그인 화면 호출
	@RequestMapping(value = "", method = RequestMethod.GET)
	public String requestLogin() throws Exception {
		
		logger.info("login GET");
		
		return "/views/login/login";
		
	}
	
	//필수정보 등록 화면 호출
	@RequestMapping(value = "/basicUserInfo", method = RequestMethod.GET)
	public String requestInsertBasicInfo() throws Exception {
		
		return "/views/user/basicUserInfo";
		
	}
	
	//네이버로그인 API callback1
	@RequestMapping(value="/naverCallback1", method = RequestMethod.GET)
	public String requestCallback1(@RequestParam String state, @RequestParam String code, HttpServletRequest request, Model model) throws Exception {

		String storedState = (String) request.getSession().getAttribute("state"); //세션에 저장된 토큰 호출
		
		if (!state.equals(storedState)) { //세션에 저장된 토큰과 인증을 요청해서 받은 토큰이 일치하는지 검증
			
			System.out.println("401 unauthorized"); //인증이 실패했을 때,
			return "redirect:/login";
			
		} else {
			
			loginService.NaverUserLogin(state, code);
			return "redirect:/login/naverCallback";
		}
		
	}
	
	//네이버로그인 API callback
	@RequestMapping(value="/naverCallback", method = RequestMethod.GET)
	public String requestCallback() throws Exception {
		
		return "/views/login/naverCallback";
		
	}

}
