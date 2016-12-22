package com.buy.together.domain;

public class MySearchCriteria extends Criteria{

/*	private int page;
	private int perPageNum;*/
	private String searchType;
	private String keyword;
	private int user_number;
	
	
	
	
	public int getUser_number() {
		return user_number;
	}
	public void setUser_number(int user_number) {
		this.user_number = user_number;
	}
	public String getSearchType() {
		return searchType;
	}
	public void setSearchType(String searchType) {
		this.searchType = searchType;
	}
	public String getKeyword() {
		return keyword;
	}
	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}
/*	@Override
	public String toString() {
		return super.toString() + " SearchCriteria "
				+ "[searchType=" + searchType + ", keyword="
				+ keyword + "]";
	}*/
	@Override
	public String toString() {
		return "MySearchCriteria [searchType=" + searchType + ", keyword=" + keyword + ", user_number=" + user_number
				+ "]";
	}
	
	
}