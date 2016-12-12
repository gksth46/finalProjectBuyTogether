package com.buy.together.dao;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.buy.together.domain.User;

@Repository
public class LoginDaoImpl implements LoginDao {

	@Inject
	private SqlSession sqlSession;
	
	private static String namespace = "com.buy.together.mapper.LoginMapper";
	
	@Override
	public User buyTogetherLogin(User user) throws Exception {
		
		return sqlSession.selectOne(namespace + ".buyTogetherLogin", user);
		
	}

	@Override
	public User externalLogin(User user) throws Exception {
		
		return sqlSession.selectOne(namespace + ".externalLogin", user);
		
	}
	
	@Override
	public void create(User user) throws Exception {
		
		sqlSession.insert(namespace + ".create", user);
		
	}

	@Override
	public User checkNaverUser(String id) throws Exception {
		
		return sqlSession.selectOne(namespace+".existID", id);
		
	}

}
