package com.buy.together.dto;

import com.buy.together.domain.BuyTogether;
import com.buy.together.domain.BuyTogetherAddress;

public class BuyTogetherWriteDTO {
	
	private BuyTogether buytogether;
	private BuyTogetherAddress buyTogetherAddress;
	
	public BuyTogether getBuytogether() {
		
		return buytogether;
	}
	
	public void setBuytogether(BuyTogether buytogether) {
		
		this.buytogether = buytogether;
	}
	
	public BuyTogetherAddress getBuyTogetherAddress() {
		
		return buyTogetherAddress;
	}
	
	public void setBuyTogetherAddress(BuyTogetherAddress buyTogetherAddress) {
		
		this.buyTogetherAddress = buyTogetherAddress;
	}
	
}
