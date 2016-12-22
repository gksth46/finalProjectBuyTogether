package com.buy.together.service;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.buy.together.dao.FaqDao;
import com.buy.together.domain.Board;

@Service
public class FaqSerivceImpl implements FaqService {

	@Inject
	private FaqDao dao;

	/****** 전체보기 리스트 ******/	
	@Override
	public List<Board> faqAllList() throws Exception {

		List<Board> faq = dao.faqAllList();

		return faq;
	}

	/****** 회원관련 리스트 ******/
	@Override
	public List<Board> faqUserList() throws Exception {

		List<Board> faq = dao.faqUserList();

		return faq;
	}

	/****** 사냥관련 리스트 ******/
	@Override
	public List<Board> faqBuyList() throws Exception {

		List<Board> faq = dao.faqBuyList();

		return faq;
	}

	/****** 정보관련 리스트 ******/
	@Override
	public List<Board> faqInfoList() throws Exception {

		List<Board> faq = dao.faqInfoList();

		return faq;
	}

	/****** 고객센터 리스트 ******/
	@Override
	public List<Board> faqCenter() throws Exception {

		List<Board> faq = dao.faqCenterList();

		return faq;
	}


}
