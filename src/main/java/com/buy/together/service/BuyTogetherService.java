package com.buy.together.service;

import java.util.List;

import com.buy.together.domain.BuyTogether;
import com.buy.together.domain.BuyTogetherAddress;
import com.buy.together.domain.Category;
import com.buy.together.domain.HuntingType;
import com.buy.together.dto.BuyTogetherDTO;

public interface BuyTogetherService {
	
	public List<BuyTogetherDTO> buyTogetherList() throws Exception;
	
	public List<Category> categoryList() throws Exception;
	
	public List<HuntingType> huntingTypeList() throws Exception;
	
	public Integer buyTogetherWrite(BuyTogether buyTogether) throws Exception;

	public void buyTogetherWriteAddress(BuyTogetherAddress buyTogetherAddress) throws Exception;
}
