package com.buy.together.dto;

public class LoginDTO { //같이사냥 회원 및 같이사냥 로그인을 위한 DTO
	
	private int number;
	private String id;
	private String pw;
	
	public LoginDTO() {

	}
	
	public LoginDTO(int number, String id, String pw) {
		this.number = number;
		this.id = id;
		this.pw = pw;
	}

	public int getNumber() {
		return number;
	}

	public void setNumber(int number) {
		this.number = number;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getPw() {
		return pw;
	}

	public void setPw(String pw) {
		this.pw = pw;
	}
	
}
