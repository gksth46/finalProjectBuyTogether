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
@RequestMapping("/user")
public class LoginController {

	private static final Logger logger = LoggerFactory.getLogger(LoginController.class);
	
	@Inject
	private LoginService loginService;

	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public String login() throws Exception {
		
		logger.info("login GET");
		
		return "/views/user/login";
		
	}
	
	@RequestMapping(value = "/info", method = RequestMethod.GET)
	public String requestInsertBasicInfo(@RequestParam("id") String id, @RequestParam("name") String name,
			@RequestParam("email") String email, Model model) throws Exception {
		
		logger.info("requestInsertBasicInfo GET");
		User user = new User();
		user.setId(id);
		user.setName(name);
		user.setEmail(email);
		model.addAttribute(user);
		
		return "/";
		
	}
	
	@RequestMapping(value="/naverCallback", method = RequestMethod.GET)
	public String callback(@RequestParam String state, @RequestParam String code, HttpServletRequest request, Model model) throws Exception {

		String storedState = (String) request.getSession().getAttribute("state");  //세션에 저장된 토큰을 받아옵니다.

		if (!state.equals(storedState)) {             //세션에 저장된 토큰과 인증을 요청해서 받은 토큰이 일치하는지 검증합니다.
			
			System.out.println("401 unauthorized");   //인증이 실패했을 때의 처리 부분입니다.
			
			return "/views/user/login";
			
		} else {
			
			User user = loginService.NaverUserLogin(state, code);

			return "/views/user/info";
			
		}
	
	}
	
	@RequestMapping(value = "/test", method = RequestMethod.GET)
	public String test() throws Exception {
		
		logger.info("test GET");
		
		return "/views/user/test";
		
	}

}
