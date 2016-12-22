package com.buy.together.dao;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.buy.together.domain.Interest;
import com.buy.together.domain.User;
import com.buy.together.domain.UserAddress;

@Repository
public class UserDaoImpl implements UserDao {

	@Inject
	private SqlSession sqlSession;	
	private static String namespace = "com.buy.together.mapper.UserMapper";
	
	//user 테이블 닉네임 중복 확인
	@Override
	public String checkUserNickname(String nickname) throws Exception {
		
		return sqlSession.selectOne(namespace + ".checkUserNickname", nickname);
		
	}
	
	//admin 테이블 닉네임 중복 확인
	@Override
	public String checkAdminNickname(String nickname) throws Exception {
		
		return sqlSession.selectOne(namespace + ".checkAdminNickname", nickname);
		
	}
	
	//로그인 유저 닉네임 DB 저장
	@Override
	public void registNickname(User user) throws Exception {
		
		sqlSession.insert(namespace + ".registNickname", user);
		
	}

	//로그인 유저 관심 지역 DB 저장
	@Override
	public void registUserAddress(UserAddress userAddress) throws Exception {
		
		sqlSession.insert(namespace + ".registUserAddress", userAddress);
		
	}

	//로그인 유저 관심 카테고리 DB 저장
	@Override
	public void registInterest(Interest interest) throws Exception {
		
		sqlSession.insert(namespace + ".registInterest", interest);
		
	}
	
	//회원 정보 DB 요청
	@Override
	public User readBUser(User user) throws Exception {
		
		return sqlSession.selectOne(namespace + ".readBUser", user);
		
	}

	//회원 정보 DB 요청
	@Override
	public User readEUser(User user) throws Exception {
		
		return sqlSession.selectOne(namespace + ".readEUser", user);
		
	}
	
	//회원 정보 DB 삭제
	@Override
	public void delete(int user_number) throws Exception {
		
		sqlSession.insert(namespace + ".delete", user_number);
		
	}
	
}
