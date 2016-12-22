package com.buy.together.service;

import com.buy.together.domain.User;
import com.buy.together.dto.UserDTO;

public interface UserService {

	public String checkNickname(String nickName) throws Exception;
	
	public void registBasicInfo(UserDTO userDTO) throws Exception;
	
	public String removeBUser(User user) throws Exception;
	
	public String removeEUser(User user) throws Exception;
	
}
