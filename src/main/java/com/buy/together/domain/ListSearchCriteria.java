package com.buy.together.domain;

public class ListSearchCriteria extends Criteria {

	private int category_number;
	private int hunting_type_number;
	private int hunting_status_number;
	private String buytogether_address_sido;
	private String buytogether_address_sigungu;
	private int regDate;
	private int user_number;
	private String searchType;
	private String keyword;

	public int getCategory_number() {
		return category_number;
	}

	public void setCategory_number(int category_number) {
		this.category_number = category_number;
	}

	public int getHunting_type_number() {
		return hunting_type_number;
	}

	public void setHunting_type_number(int hunting_type_number) {
		this.hunting_type_number = hunting_type_number;
	}

	public int getHunting_status_number() {
		return hunting_status_number;
	}

	public void setHunting_status_number(int hunting_status_number) {
		this.hunting_status_number = hunting_status_number;
	}

	public String getBuytogether_address_sido() {
		return buytogether_address_sido;
	}

	public void setBuytogether_address_sido(String buytogether_address_sido) {
		this.buytogether_address_sido = buytogether_address_sido;
	}

	public String getBuytogether_address_sigungu() {
		return buytogether_address_sigungu;
	}

	public void setBuytogether_address_sigungu(String buytogether_address_sigungu) {
		this.buytogether_address_sigungu = buytogether_address_sigungu;
	}
	
	public int getUser_number() {
		return user_number;
	}

	public void setUser_number(int user_number) {
		this.user_number = user_number;
	}

	public int getRegDate() {
		return regDate;
	}

	public void setRegDate(int regDate) {
		this.regDate = regDate;
	}

	public String getKeyword() {
		return keyword;
	}

	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}

}
