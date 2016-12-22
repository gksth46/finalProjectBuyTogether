package com.buy.together.service;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.buy.together.dao.BuyTogetherDao;
import com.buy.together.domain.AttachedPhoto;
import com.buy.together.domain.BuyTogether;
import com.buy.together.domain.BuyTogetherAddress;
import com.buy.together.domain.Category;
import com.buy.together.domain.HuntingType;
import com.buy.together.dto.BuyTogetherDTO;

@Service
public class BuyTogetherServiceImpl implements BuyTogetherService {

	@Inject
	private BuyTogetherDao dao;
	
	@Override //같이사냥 게시판 리스트
	public List<BuyTogetherDTO> buyTogetherList() throws Exception {
		
		List<BuyTogetherDTO> buyTogether = dao.buyTogetherList();
		
		for(int i = 0; i<buyTogether.size(); i++) {
			
			List<AttachedPhoto> attachedPhotos = dao.photoList(buyTogether.get(i).getBuyTogether_number());
			
			buyTogether.get(i).setPath(attachedPhotos);
			
		}
		
		return buyTogether;
	}
	
	@Override
	public List<Category> categoryList() throws Exception {

		return dao.categoryList();
	}

	@Override
	public List<HuntingType> huntingTypeList() throws Exception {

		return dao.huntingTypeList();
	}

	@Transactional
	@Override
	public Integer buyTogetherWrite(BuyTogether buyTogether) throws Exception {

		dao.buyTogetherInsert(buyTogether);

		//입력한 같이사냥 글의 번호를 가져온다.
		int number = dao.getBuyTogetherNumber(buyTogether);

		if(buyTogether.getPath() != null){
			for(int i=0; i<buyTogether.getPath().length; i++){
				AttachedPhoto photo = new AttachedPhoto();
				photo.setBuyTogether_number(number);
				photo.setPath(buyTogether.getPath()[i]);
				dao.buyTogetherPhotoInsert(photo);
			}
		}

		return number;
	}

	@Override
	public void buyTogetherWriteAddress(BuyTogetherAddress buyTogetherAddress) throws Exception {

		dao.buyTogetherAddressInsert(buyTogetherAddress);
	}
}
