package com.buy.together.dto;

import java.util.List;

public class UserDTO { //필수 정보 등록을 위한 DTO
	
	private String nickname;
	private String user_sido;
	private String user_sigungu;
	private String user_dong;
	private int user_number;
	private List<String> category;
	
	public String getNickname() {
		return nickname;
	}
	
	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public String getUser_sido() {
		return user_sido;
	}

	public void setUser_sido(String user_sido) {
		this.user_sido = user_sido;
	}

	public String getUser_sigungu() {
		return user_sigungu;
	}

	public void setUser_sigungu(String user_sigungu) {
		this.user_sigungu = user_sigungu;
	}

	public String getUser_dong() {
		return user_dong;
	}

	public void setUser_dong(String user_dong) {
		this.user_dong = user_dong;
	}

	public int getUser_number() {
		return user_number;
	}

	public void setUser_number(int user_number) {
		this.user_number = user_number;
	}

	public List<String> getCategory() {
		return category;
	}

	public void setCategory(List<String> category) {
		this.category = category;
	}
	
}
