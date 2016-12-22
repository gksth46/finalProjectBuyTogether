package com.buy.together.domain;

import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

public class PageMaker {

	private int totalCount; //전체 글 갯수
	private int startPage; //시작 페이지 번호
	private int endPage; //끝 페이지 번호
	private boolean prev; //이전 페이지 리스트 존재 여부
	private boolean next; //다음 페이지 리스트 존재 여부
	private int displayPageNum = 10; //한 페이지에서 보여질 페이지 번호 갯수
	private Criteria cri; //page = 페이지 번호, perPageNum = 한 페이지에서 보여질 게시글 갯수
	
	

	public void setCri(Criteria cri) {
		this.cri = cri;
	}

	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;

		calcData();
	}

	private void calcData() {

		endPage = (int) (Math.ceil(cri.getPage() / (double) displayPageNum) * displayPageNum);

		startPage = (endPage - displayPageNum) + 1;

		int tempEndPage = (int) (Math.ceil(totalCount / (double) cri.getPerPageNum()));

		if (endPage > tempEndPage) {
			endPage = tempEndPage;
		}

		prev = startPage == 1 ? false : true;

		next = endPage * cri.getPerPageNum() >= totalCount ? false : true;

	}

	public int getTotalCount() {
		return totalCount;
	}

	public int getStartPage() {
		return startPage;
	}

	public int getEndPage() {
		return endPage;
	}

	public boolean isPrev() {
		return prev;
	}

	public boolean isNext() {
		return next;
	}

	public int getDisplayPageNum() {
		return displayPageNum;
	}
	
	public void setDisplayPageNum(int displayPageNum) {
		this.displayPageNum = displayPageNum;
	}

	public Criteria getCri() {
		return cri;
	}

	public String makeQuery(int page) {

		UriComponents uriComponents = 
				UriComponentsBuilder.newInstance()
				.queryParam("page", page)
				.queryParam("perPageNum", cri.getPerPageNum())
				.build();

		return uriComponents.toUriString();
	}

	@Override
	public String toString() {
		return "PageMaker [totalCount=" + totalCount + ", startPage=" + startPage + ", endPage=" + endPage + ", prev="
				+ prev + ", next=" + next + ", displayPageNum=" + displayPageNum + ", cri=" + cri + "]";
	}

}




