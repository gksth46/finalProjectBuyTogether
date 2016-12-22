package com.buy.together.service;

import com.buy.together.domain.User;
import com.buy.together.dto.LoginDTO;

public interface LoginService {

	public LoginDTO buyTogetherLogin(User user) throws Exception;
	
	public User facebookLogin(User user) throws Exception;
	
	public void regist(User user) throws Exception;
	
	public void NaverUserLogin(String state, String code) throws Exception;
	
}
