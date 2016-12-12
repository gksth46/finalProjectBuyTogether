package com.buy.together.dao;

import com.buy.together.domain.User;

public interface LoginDao {

	public User buyTogetherLogin(User user) throws Exception;

	public User externalLogin(User user) throws Exception;
	
	public void create(User user) throws Exception;
	
	public User checkNaverUser(String id) throws Exception;
	
}
