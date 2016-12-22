package com.buy.together.controller;

import java.util.Locale;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/buyTogether/*")
public class BuyTogetherController {

	private static final Logger logger = LoggerFactory.getLogger(BuyTogetherController.class);

	@RequestMapping(value ="/list", method = RequestMethod.GET)
	public String requestBuyTogetherList(Locale locale) {
		
		System.out.println("buyTogetherController/list");
		logger.info("Welcome home! The client locale is {}.", locale);
		
		return "/views/buyTogether/categorybuytogetherList";
	}
	
	@RequestMapping(value ="/listMap", method = RequestMethod.GET)
	public String requestBuyTogetherMapList(Locale locale) {
		
		System.out.println("buyTogetherController/list");
		logger.info("Welcome home! The client locale is {}.", locale);
	
		return "/views/buyTogether/mapbuytogetherList";
	}
	
	@RequestMapping(value ="/write", method = RequestMethod.GET)
	public String requestBuyTogetherWrite(Locale locale) {
		
		System.out.println("buyTogetherController/write");
		logger.info("Welcome home! The client locale is {}.", locale);
		
		return "/views/buyTogether/buytogetherwrite";
	}
	
}
