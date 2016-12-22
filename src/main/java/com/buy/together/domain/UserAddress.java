package com.buy.together.domain;

public class UserAddress {

	private int user_address_number;
	private String user_sido;
	private String user_sigungu;
	private int user_number;

	public UserAddress() {
		
	}
	
	public UserAddress(String user_sido, String user_sigungu,int user_number) {
		this.user_sido = user_sido;
		this.user_sigungu = user_sigungu;
		this.user_number = user_number;
	}

	public int getUser_address_number() {
		return user_address_number;
	}

	public void setUser_address_number(int user_address_number) {
		this.user_address_number = user_address_number;
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

	public int getUser_number() {
		return user_number;
	}

	public void setUser_number(int user_number) {
		this.user_number = user_number;
	}

}
