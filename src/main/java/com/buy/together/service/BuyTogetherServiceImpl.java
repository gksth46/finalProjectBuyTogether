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
import com.buy.together.domain.HuntingStatus;
import com.buy.together.domain.HuntingType;
import com.buy.together.domain.ListSearchCriteria;
import com.buy.together.dto.BuyTogetherDTO;

@Service
public class BuyTogetherServiceImpl implements BuyTogetherService {

	@Inject
	private BuyTogetherDao dao;
	
	@Override //유저의 관심 카테고리 존재 여부 확인
	public Integer userInterest(Integer user_number) throws Exception {
		return dao.userInterestDao(user_number);
	}

	@Override //리스트 확인
	public Integer searchBuyTogetherCount(ListSearchCriteria cri) throws Exception {
		return dao.searchBuyTogetherCount(cri);
	}
	
	@Override//같이사냥 지도리스트
	public List<BuyTogetherDTO> searchBuyTogetherMapList(ListSearchCriteria cri) throws Exception {
		
		List<BuyTogetherDTO> searchBuyTogether = dao.searchBuyTogetherMapList(cri);

		for(int i = 0; i<searchBuyTogether.size(); i++){
			List<AttachedPhoto> attachedPhotos = dao.photoList(searchBuyTogether.get(i).getBuyTogether_number());

			searchBuyTogether.get(i).setPhoto_path(attachedPhotos);
		}
		
		return searchBuyTogether;
	}
	
	@Override //같이사냥 리스트
	public List<BuyTogetherDTO> searchBuyTogetherList(ListSearchCriteria cri) throws Exception {

		List<BuyTogetherDTO> buyTogether = dao.searchBuyTogetherList(cri);

		for(int i = 0; i<buyTogether.size(); i++) {

			List<AttachedPhoto> attachedPhotos = dao.photoList(buyTogether.get(i).getBuyTogether_number());

			buyTogether.get(i).setPhoto_path(attachedPhotos);

		}

		return buyTogether;
	}

	@Override //카테고리 리스트
	public List<Category> categoryList() throws Exception {

		return dao.categoryList();
	}

	@Override //사냥방식 리스트
	public List<HuntingType> huntingTypeList() throws Exception {

		return dao.huntingTypeList();
	}
	
	@Override //사냥 상태 리스트
	public List<HuntingStatus> huntingStatusList() throws Exception {

		return dao.huntingStatusList();
	}

	@Transactional
	@Override //같이사낭 쓰기
	public Integer buyTogetherWrite(BuyTogether buyTogether) throws Exception {

		dao.buyTogetherInsert(buyTogether);

		//입력한 같이사냥 글의 번호를 가져온다.
		int number = dao.getBuyTogetherNumber(buyTogether);

		//같이사냥 글과 함께 사진 경로까지 입력
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

	@Override //같이사냥 쓰기시 주소 입력
	public void buyTogetherWriteAddress(BuyTogetherAddress buyTogetherAddress) throws Exception {

		dao.buyTogetherAddressInsert(buyTogetherAddress);
	}
}
