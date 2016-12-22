package com.buy.together.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import com.buy.together.domain.AttachedPhoto;
import com.buy.together.domain.Comment;
import com.buy.together.domain.DeclareBoard;
import com.buy.together.dto.BuyTogetherDTO;

@Repository
public class BuyTogetherReadDaoImpl implements BuyTogetherReadDao {

	private static final String namespace = "com.buy.together.mappers.buyTogetherReadMapper";
	private static final Logger logger = LoggerFactory.getLogger(BuyTogetherReadDaoImpl.class);

	@Inject
	private SqlSession sqlSession;

	// 게시글의 사진 리스트 조회
	@Override 
	public List<AttachedPhoto> photoList(Integer buytogether_number) throws Exception {

		return sqlSession.selectList(namespace + ".photoList", buytogether_number);

	}

	// 같이사냥 글 조회
	@Override
	public BuyTogetherDTO buyTogetherRead(Integer buytogether_number) throws Exception {

		return sqlSession.selectOne(namespace + ".read", buytogether_number);
	}

	// 댓글 리스트 부분
	@Override 
	public List<Comment> commentList(Integer buytogether_number, Integer comment_type_number) throws Exception {

		Map<String, Object> map = new HashMap<>();

		map.put("buytogether_number", buytogether_number);
		map.put("comment_type_number", comment_type_number);

		return sqlSession.selectList(namespace + ".commentList", map);

	}

	// 같이사냥 댓글 글쓰기
	@Override
	public void createComment(Comment comment) throws Exception {

		sqlSession.insert(namespace + ".commentInsert", comment);

	}

	// 같이사냥 댓글 삭제
	@Override
	public void deleteComment(Integer comment_number) throws Exception {

		sqlSession.delete(namespace + ".commentDelete", comment_number);

	}

	// 같이사냥 댓글 수정
	@Override
	public void commentUpdate(Comment comment) throws Exception {

		Map<String, Object> map = new HashMap<>();

		map.put("comment_content", comment.getComment_content());
		map.put("buytogether_number", comment.getBuytogether_number());
		map.put("comment_number", comment.getComment_number());

		System.out.println("comment_content = " + comment.getComment_content());

		sqlSession.update(namespace + ".commentUpdate", map);

	}

	// 같이사냥 답글 쓰기
	@Override
	public void createRecomment(Comment comment) throws Exception {

		Map<String, Object> map = new HashMap<>();

		map.put("comment_parent_number", comment.getComment_parent_number());
		map.put("comment_content", comment.getComment_content());
		map.put("buytogether_number", comment.getBuytogether_number());
		map.put("user_number", comment.getUser_number());
		map.put("comment_type_number", comment.getComment_type_number());

		logger.info("comment_parent_number", comment.getComment_parent_number());

		sqlSession.insert(namespace + ".recommentInsert", map);

	}

	// 같이사냥 답글 리스트
	@Override
	public List<Comment> recommentList(Integer comment_number, Integer comment_type_number) throws Exception {

		Map<String, Object> map = new HashMap<>();

		map.put("comment_number", comment_number);
		map.put("comment_type_number", comment_type_number);

		return sqlSession.selectList(namespace+".recommentList", map);
	}

	// 같이사냥 게시판 삭제
	@Override
	public void deleteBuytogether(Integer buytogether_number, Integer user_number) throws Exception {

		Map<String, Object> map = new HashMap<>();

		map.put("buytogether_number", buytogether_number);
		map.put("user_number", user_number);

		sqlSession.delete(namespace+".deleteBuytogether", map);

	}

	// 같이사냥 버튼 
	@Override
	public void registBuytogether(Integer user_number, Integer matching_status_number, Integer buytogether_number)
			throws Exception {

		Map<String, Object> map = new HashMap<>();

		map.put("user_number", user_number);
		map.put("matching_status_number", matching_status_number);
		map.put("buytogether_number", buytogether_number);

		sqlSession.insert(namespace+".registBuytogether", map);

	}

	// 찜하기 버튼
	@Override
	public void insertDip(Integer buytogether_number, Integer user_number) throws Exception {
		
		Map<String, Object> map = new HashMap<>();

		map.put("buytogether_number", buytogether_number);
		map.put("user_number", user_number);
		
		sqlSession.insert(namespace+".registDip", map);
		
	}

	// 찜하기 취소
	@Override
	public void deleteDip(Integer buytogether_number, Integer user_number) throws Exception {
		
		Map<String, Object> map = new HashMap<>();

		map.put("buytogether_number", buytogether_number);
		map.put("user_number", user_number);
		
		sqlSession.delete(namespace+".deleteDip", map);
		
	}

	// 찜하기 확인
	@Override
	public Integer checkDip(Integer buytogether_number, Integer user_number) throws Exception {
		
		Map<String, Object> map = new HashMap<>();

		map.put("buytogether_number", buytogether_number);
		map.put("user_number", user_number);
		
		return sqlSession.selectOne(namespace+".checkDip", map);
		
	}

	// 신고 당한 사람 내용 / 닉네임 
	@Override
	public Comment reportDao(Integer buytogether_number, Integer comment_number) throws Exception {
		
		Map<String, Object> map = new HashMap<>();

		map.put("buytogether_number", buytogether_number);
		map.put("comment_number", comment_number);
		
		return sqlSession.selectOne(namespace+".report", map);
	}

	// 신고페이지 신고내역 입력
	@Override
	public void sendReport(DeclareBoard declareBoard) throws Exception {
		
		sqlSession.insert(namespace+".sendReport", declareBoard);
		
	}


}
