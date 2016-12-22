package com.buy.together.controller;

import java.util.Locale;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/customerCenter/*")
public class FaqController {

	private static final Logger logger = LoggerFactory.getLogger(FaqController.class);

	@RequestMapping(value ="/faq", method = RequestMethod.GET)
	public String requestFaq(Locale locale, Model model) {

		return "/views/customerCenter/faq";
	}

}
