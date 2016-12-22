package com.buy.together.dao;

import java.util.List;

import com.buy.together.domain.Board;

public interface FaqDao {

	public List<Board> faqAllList() throws Exception;
	
	public List<Board> faqUserList() throws Exception;
	
	public List<Board> faqBuyList() throws Exception;
	
	public List<Board> faqInfoList() throws Exception;
	
	public List<Board> faqCenterList() throws Exception;
	
}
