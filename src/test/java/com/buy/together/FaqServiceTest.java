package com.buy.together;

import java.util.List;

import javax.inject.Inject;

import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.buy.together.domain.Board;
import com.buy.together.service.FaqService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations ={"file:src/main/webapp/WEB-INF/spring/**/*.xml"})
public class FaqServiceTest {

	private static final Logger logger = LoggerFactory.getLogger(FaqServiceTest.class);
	
	@Inject
	FaqService service;
	
	//FaqAllList [전체보기]Test
	@Ignore
	@Test
	public void testFaqAllList() throws Exception {
		
		logger.info("testFaqAllList() 호출됨.");
		List<Board> list = service.faqAllList();
		
		for(int i = 0 ; i < list.size() ; i++) {
			logger.info(list.get(i).toString());
		}
		
	}
	
	//FaqUserList [회원관련]Test
	@Ignore
	@Test
	public void testFaqUserList() throws Exception{
		
		logger.info("testFaqUserList() 호출됨.");
		List<Board> list = service.faqUserList();
		
		for(int i = 0 ; i < list.size() ; i++) {
			logger.info(list.get(i).toString());
		}
	}
	
	//FaqBuyList [사냥관련]Test
	@Ignore
	@Test
	public void testFaqBuyList() throws Exception{
		
		logger.info("testFaqBuyList() 호출됨.");
		List<Board> list = service.faqBuyList();
		
		for(int i = 0 ; i < list.size() ; i++) {
			logger.info(list.get(i).toString());
		}
		
	}
	
	//FaqInfoList [정보관련]Test
	@Ignore
	@Test
	public void testFaqInfoList() throws Exception{
		
		logger.info("testFaqInfoList() 호출됨.");
		List<Board> list = service.faqInfoList();
		
		for(int i = 0 ; i < list.size() ; i++) {
			logger.info(list.get(i).toString());
		}
		
	}
	
	//FaqCenterList [고객센터]Test
	@Test
	public void testFaqCenterList() throws Exception{
		
		logger.info("testFaqCenterList() 호출됨.");
		List<Board> list = service.faqCenter();
		
		for(int i = 0 ; i < list.size() ; i++) {
			logger.info(list.get(i).toString());
		}
	}
}
