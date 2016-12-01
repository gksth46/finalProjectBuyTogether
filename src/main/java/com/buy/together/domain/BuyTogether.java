package com.buy.together.domain;

import java.util.Date;

public class BuyTogether {

	private int buyTogether_number;
	private String title;
	private String content;
	private Date writeDate;
	private Date updateDate;
	private Date dueDate;
	private int joinin_number;
	private int price;
	private int category_number;
	private int user_number;
	private int status_number;
	private int hunting_type_number;

	public BuyTogether() {

	}

	public int getBuyTogether_number() {
		return buyTogether_number;
	}

	public void setBuyTogether_number(int buyTogether_number) {
		this.buyTogether_number = buyTogether_number;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Date getWriteDate() {
		return writeDate;
	}

	public void setWriteDate(Date writeDate) {
		this.writeDate = writeDate;
	}

	public Date getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}

	public int getJoinin_number() {
		return joinin_number;
	}

	public void setJoinin_number(int joinin_number) {
		this.joinin_number = joinin_number;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public int getCategory_number() {
		return category_number;
	}

	public void setCategory_number(int category_number) {
		this.category_number = category_number;
	}

	public int getUser_number() {
		return user_number;
	}

	public void setUser_number(int user_number) {
		this.user_number = user_number;
	}

	public int getStatus_number() {
		return status_number;
	}

	public void setStatus_number(int status_number) {
		this.status_number = status_number;
	}

	public int getHunting_type_number() {
		return hunting_type_number;
	}

	public void setHunting_type_number(int hunting_type_number) {
		this.hunting_type_number = hunting_type_number;
	}

	public Date getDueDate() {
		return dueDate;
	}

	public void setDueDate(Date dueDate) {
		this.dueDate = dueDate;
	}
	
	
}