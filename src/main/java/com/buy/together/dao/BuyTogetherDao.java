package com.buy.together.dao;

import java.util.List;

import com.buy.together.domain.AttachedPhoto;
import com.buy.together.domain.BuyTogether;
import com.buy.together.domain.BuyTogetherAddress;
import com.buy.together.domain.Category;
import com.buy.together.domain.HuntingType;
import com.buy.together.dto.BuyTogetherDTO;

public interface BuyTogetherDao {
	
	public List<BuyTogetherDTO> buyTogetherList() throws Exception;
	
	public List<AttachedPhoto> photoList(Integer buytogether_number) throws Exception;

	public List<Category> categoryList() throws Exception;
	
	public List<HuntingType> huntingTypeList() throws Exception;
	
	public void buyTogetherInsert(BuyTogether buyTogether) throws Exception;
	
	public Integer getBuyTogetherNumber(BuyTogether buyTogether) throws Exception;

	public void buyTogetherAddressInsert(BuyTogetherAddress BuyTogetherAddress) throws Exception;
	
	public void buyTogetherPhotoInsert(AttachedPhoto AttachedPhoto) throws Exception;

}
