package com.buy.together.service;

import com.buy.together.domain.User;

public interface LoginService {

	public User buyTogetherLogin(User user) throws Exception;
	
	public User externalLogin(User user) throws Exception;
	
	public void regist(User user) throws Exception;
	
	public User NaverUserLogin(String state, String code) throws Exception;
}
