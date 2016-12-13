package com.buy.together.service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

import javax.inject.Inject;

import org.json.JSONObject;
import org.json.XML;
import org.springframework.stereotype.Repository;

import com.buy.together.dao.LoginDao;
import com.buy.together.domain.User;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

@Repository
public class LoginServiceImpl implements LoginService {

	@Inject
	private LoginDao loginDao;
	private static final String clientId = "by6_tJPL7JlGEEddntmk";
	private static final String clientSecret = "WRUaNm8T4x";
	private static final String userProfileUrl = "https://apis.naver.com/nidlogin/nid/getUserProfile.xml";
	//private static HttpServletRequest request = null;			
	//private static HttpSession session = null;
	//https://apis.naver.com/nidlogin/nid/getUserProfile.xml
	@Override
	public User buyTogetherLogin(User user) throws Exception {
		
		User loginUser = loginDao.buyTogetherLogin(user);
		
		return loginUser;
	}

	@Override
	public User externalLogin(User user) throws Exception {
		
		User isNewUser = loginDao.externalLogin(user);
		
		if(isNewUser==null) { // //신규 회원이면 로그인 정보 저장

			loginDao.create(user);
			
		} 
		
		return isNewUser;
		
	}
	
	@Override
	public void regist(User user) throws Exception {
	
		loginDao.create(user);
		
	}

	@Override
	public User NaverUserLogin(String state, String code) throws Exception {		
		//accessToken 요청 및 파싱부분
		String data = getUserNaverToken(getAccessUrl(state, code), null);
		Map<String,String> map = JSONStringToMap(data);   

		String accessToken = map.get("access_token");

		String tokenType = map.get("token_type"); 

		String profileDataXml = getUserNaverToken(userProfileUrl, tokenType +" "+ accessToken); 
		// tokentype 와 accessToken을 조합한 값을 해더의 Authorization에 넣어 전송합니다. 결과 값은 xml로 출력됩니다. 

		JSONObject jsonObject =  XML.toJSONObject(profileDataXml);     //xml을 json으로 파싱합니다.
		JSONObject responseData = jsonObject.getJSONObject("data");   

		//json의 구조가 data 아래에 자식이 둘인 형태여서 map으로 파싱이 안됩니다. 따라서 자식 노드로 접근합니다.
		Map<String,String> userMap = JSONStringToMap(responseData.get("response").toString()); 

		String id = userMap.get("id");
		String email = userMap.get("email");
		String name = userMap.get("name");
		
		User user = new User();
		user.setId(id);
		user.setEmail(email);
		user.setName(name);
		
		User naverUser = loginDao.externalLogin(user); //네이버 유저의 아이디가 DB에 있는지 확인
		
		if(naverUser == null) { //신규 회원

			loginDao.create(user);
			
		} 
		
		return naverUser;
		
	}	
	
	//json형태 문자열을 Map<>으로 변환
	private static Map<String, String> JSONStringToMap(String str) throws Exception {

		Map<String,String> map = new HashMap<String,String>();
		ObjectMapper mapper = new ObjectMapper();
		map = mapper.readValue(str, new TypeReference<HashMap<String,String>>() {});

		return map;
		
	}


	//사용자인증토큰을 받아옴
	private String getUserNaverToken(String url, String authorization) {

		HttpURLConnection httpRequest = null;
		String resultValue = null;

		try {

			URL u = new URL(url);
			httpRequest = (HttpURLConnection) u.openConnection();
			httpRequest.setRequestProperty("Content-type", "text/xml; charset=UTF-8");

			if(authorization != null){

				httpRequest.setRequestProperty("Authorization", authorization);
			}

			httpRequest.connect();
			BufferedReader in = new BufferedReader(new InputStreamReader(httpRequest.getInputStream(), "UTF-8"));

			StringBuffer sb = new StringBuffer();
			String line = null;

			while((line = in.readLine()) != null){

				sb.append(line);
				sb.append("\n");

			}

			resultValue = sb.toString();

		} catch (Exception e) { 			
		} finally {
			
			if (httpRequest != null) {

				httpRequest.disconnect();
			}
		}
		
		return resultValue;

	}

	//네이버 로그인 URL접근
	private String getAccessUrl(String state, String code) {

		String accessUrl = "https://nid.naver.com/oauth2.0/token?client_id=" + clientId + "&client_secret=" + clientSecret

				+ "&grant_type=authorization_code" + "&state=" + state + "&code=" + code;

		return accessUrl;

	}

}
