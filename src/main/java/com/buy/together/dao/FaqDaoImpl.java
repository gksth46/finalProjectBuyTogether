package com.buy.together.dao;

import java.util.List;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.buy.together.domain.Board;

@Repository
public class FaqDaoImpl implements FaqDao {

	private static final String faqNamespace="com.buy.together.mappers.faqMapper";
	
	@Inject
	private SqlSession sql;
	
	/****** Faq 전체보기 리스트 ******/
	@Override
	public List<Board> faqAllList() throws Exception {
		
		return sql.selectList(faqNamespace+".faqAllList");
		
	}
	
	/****** Faq 회원관련 리스트 ******/
	@Override
	public List<Board> faqUserList() throws Exception{
		
		return sql.selectList(faqNamespace+".faqUserList");
		
	}

	/****** Faq 사냥관련 리스트 ******/
	@Override
	public List<Board> faqBuyList() throws Exception {
		
		return sql.selectList(faqNamespace+".faqBuyList");
		
	}

	/****** Faq 정보관련 리스트 ******/
	@Override
	public List<Board> faqInfoList() throws Exception {
		
		return sql.selectList(faqNamespace+".faqInfoList");
		
	}

	/****** Faq 고객센터 리스트 ******/
	@Override
	public List<Board> faqCenterList() throws Exception {
		
		return sql.selectList(faqNamespace+".faqCenterList");
		
	}
	

}
