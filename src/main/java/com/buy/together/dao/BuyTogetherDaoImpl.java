package com.buy.together.dao;

import java.util.List;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.buy.together.domain.AttachedPhoto;
import com.buy.together.domain.BuyTogether;
import com.buy.together.domain.BuyTogetherAddress;
import com.buy.together.domain.Category;
import com.buy.together.domain.HuntingType;
import com.buy.together.dto.BuyTogetherDTO;

@Repository
public class BuyTogetherDaoImpl implements BuyTogetherDao {

	private static final String namespace="com.buy.together.mappers.buyTogetherMapper";
	
	@Inject
	private SqlSession sqlSession;
	
	@Override //같이사냥 전체 게시글 조회
	public List<BuyTogetherDTO> buyTogetherList() throws Exception {

		return sqlSession.selectList(namespace+".buyTogetherList");
			
	}
	
	@Override //게시글의 사진 리스트 조회
	public List<AttachedPhoto> photoList(Integer buytogether_number) throws Exception {
	
		return sqlSession.selectList(namespace+".photoList", buytogether_number);
	
	}
	
	@Override //카테고리 리스트 조회
	public List<Category> categoryList() throws Exception {

		return sqlSession.selectList(namespace+".categoryList");
	}
	
	@Override //사냥방식 리스트 조회
	public List<HuntingType> huntingTypeList() throws Exception {

		return sqlSession.selectList(namespace+".huntingTypeList");
	}
	
	@Override //같이사냥 게시글 쓰기
	public void buyTogetherInsert(BuyTogether buyTogether) throws Exception {

		sqlSession.insert(namespace+".buytogetherInsert", buyTogether);
	}
	
	@Override //방금 쓴 게시글 번호
	public Integer getBuyTogetherNumber(BuyTogether buyTogether) throws Exception {

		return sqlSession.selectOne(namespace+".buytogetherNumber", buyTogether);
	}
	
	@Override //게시글과 함께 같이사냥 주소 저장
	public void buyTogetherAddressInsert(BuyTogetherAddress buyTogetherAddress) throws Exception {

		sqlSession.insert(namespace+".buytogetherAddressInsert", buyTogetherAddress);
	}
	
	@Override //게시글과 함께 같이사냥 첨부사진 저장
	public void buyTogetherPhotoInsert(AttachedPhoto attachedPhoto) throws Exception {

		sqlSession.insert(namespace+".buytogetherPhotoInsert", attachedPhoto);
		
	}
}
