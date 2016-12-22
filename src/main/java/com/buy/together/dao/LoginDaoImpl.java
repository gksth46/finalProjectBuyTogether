package com.buy.together.dao;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.buy.together.domain.Admin;
import com.buy.together.domain.User;

@Repository
public class LoginDaoImpl implements LoginDao {

	@Inject
	private SqlSession sqlSession;	
	private static String namespace = "com.buy.together.mapper.LoginMapper";
	
	//user 테이블 로그인 정보 조회
	@Override
	public User buyTogetherUserLogin(User user) throws Exception {
		
		return sqlSession.selectOne(namespace + ".buyTogetherUserLogin", user);
		
	}
	
	//admin 테이블 로그인 정보 조회
	@Override
	public Admin buyTogetherAdminLogin(Admin admin) throws Exception {
		
		return sqlSession.selectOne(namespace + ".buyTogetherAdminLogin", admin);
		
	}

	//user 테이블 네이버, 페이스북 로그인 정보 조회
	@Override
	public User externalLogin(User user) throws Exception {
		
		return sqlSession.selectOne(namespace + ".externalLogin", user);
		
	}
	
	//네이버, 페이스북 로그인 유저 회원가입
	@Override
	public void create(User user) throws Exception {
		
		sqlSession.insert(namespace + ".create", user);
		
	}

}
