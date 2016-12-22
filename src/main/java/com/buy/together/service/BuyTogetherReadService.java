package com.buy.together.service;

import java.util.List;

import com.buy.together.domain.AttachedPhoto;
import com.buy.together.domain.Comment;
import com.buy.together.domain.DeclareBoard;
import com.buy.together.dto.BuyTogetherDTO;

public interface BuyTogetherReadService {
	
	public BuyTogetherDTO buyTogetherRead(Integer buytogether_number) throws Exception;
	
	public void deleteBuytogether(Integer buytogether_number, Integer user_number) throws Exception;
	
	public List<AttachedPhoto> buyTogetherImage(Integer buytogether_number) throws Exception;

	public List<Comment> commentList(Integer buytogether_number, Integer comment_type_number) throws Exception;
	
	public void registComment(Comment comment) throws Exception;
	
	public void deleteComment(Integer comment_number) throws Exception;
	
	public void updateComment(Comment comment) throws Exception;
	
	public void registRecomment(Comment comment) throws Exception;
	
	public List<Comment> recommentList(Integer comment_number, Integer comment_type_number) throws Exception;
	
	public void registBuytogether(Integer user_number, Integer matching_status_number, Integer buytogether_number) throws Exception;
	
	public void registDip(Integer buytogether_number, Integer user_number) throws Exception;
	
	public void deleteDip(Integer buytogether_number, Integer user_number) throws Exception;
	
	public Integer checkDip(Integer buytogether_number, Integer user_number) throws Exception;
	
	public Comment report(Integer buytogether_number, Integer comment_number) throws Exception;
	
	public void registReport(DeclareBoard declareBoard) throws Exception;
	
}
