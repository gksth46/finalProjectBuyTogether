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
import com.buy.together.domain.Admin;
import com.buy.together.domain.User;
import com.buy.together.dto.LoginDTO;
import com.buy.together.util.BCrypt;
import com.buy.together.util.SHA256;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

@Repository
public class LoginServiceImpl implements LoginService {

	@Inject
	private LoginDao loginDao;
	private static final String clientId = "by6_tJPL7JlGEEddntmk";
	private static final String clientSecret = "WRUaNm8T4x";
	private static final String userProfileUrl = "https://apis.naver.com/nidlogin/nid/getUserProfile.xml";
	SHA256 sha = SHA256.getInsatnce();
	
	//회원 및 관리자 로그인 정보 조회
	@Override
	public LoginDTO buyTogetherLogin(User user) throws Exception {
		
		User userLogin;
		Admin adminLogin;
		LoginDTO userInfo = null;

        String shaPass = sha.getSha256(user.getPw().getBytes());
        user.setPw(shaPass);
        
		userLogin = loginDao.buyTogetherUserLogin(user);
		
		if(userLogin == null) { //로그인한 유저가 같이사냥 회원이 아니라면,
			
			adminLogin = new Admin(user.getUser_number(), user.getId(), user.getPw());
			adminLogin = loginDao.buyTogetherAdminLogin(adminLogin);
			
			if(adminLogin != null) { //같이사냥 관리자가 로그인 했다면,
				
				userInfo = new LoginDTO(adminLogin.getAdmin_number(), adminLogin.getAdmin_id(), adminLogin.getAdmin_pw());
				
			} 
			
		} else { //같이사냥 회원이 로그인 했다면,

			userInfo = new LoginDTO(userLogin.getUser_number(), userLogin.getId(), userLogin.getPw());
			
		}
		
		return userInfo;
		
	}

	//페이스북 로그인 회원 정보 조회
	@Override
	public User facebookLogin(User user) throws Exception {
		
        String shaPass = sha.getSha256(user.getPw().getBytes());
        String bcPass = BCrypt.hashpw(shaPass, BCrypt.gensalt());    
        user.setPw(bcPass);
        
		User isNewUser = loginDao.externalLogin(user);
		
		if(isNewUser == null) { //페이스북으로 로그인이 처음이라면,

			loginDao.create(user);
			isNewUser = loginDao.externalLogin(user);
			
		} 
		
		return isNewUser;
		
	}
	
	//회원 정보 DB 저장
	@Override
	public void regist(User user) throws Exception {
		
		loginDao.create(user);
		
	}
	
	//네이버 로그인 API
	@Override
	public void NaverUserLogin(String state, String code) throws Exception {		
		
		String data = getUserNaverToken(getAccessUrl(state, code), null); //accessToken 요청 및 파싱
		
		Map<String,String> map = JSONStringToMap(data);  
		String accessToken = map.get("access_token");
		String tokenType = map.get("token_type"); 
		// tokentype 와 accessToken을 조합한 값을 해더의 Authorization에 넣어 전송
		String profileDataXml = getUserNaverToken(userProfileUrl, tokenType +" "+ accessToken); 
		
		JSONObject jsonObject =  XML.toJSONObject(profileDataXml); //xml을 json으로 파싱
		JSONObject responseData = jsonObject.getJSONObject("data");   
		//json의 구조가 data 아래에 자식이 둘인 형태여서 map으로 파싱이 안되기 때문에 자식 노드로 접근
		Map<String,String> userMap = JSONStringToMap(responseData.get("response").toString()); 
		
		User user = new User(Integer.parseInt(userMap.get("id")), userMap.get("name"), userMap.get("email"));
		User naverUser = loginDao.externalLogin(user); //네이버 로그인 회원의 아이디 조회
		
		if(naverUser == null) { //네이버 로그인이 처음이라면,

			loginDao.create(user); //회원 정보 DB 저장
			naverUser = loginDao.externalLogin(user);
			
		}
		
	}	
	
	//json형태 문자열을 Map<>으로 변환
	private static Map<String, String> JSONStringToMap(String str) throws Exception {

		Map<String,String> map = new HashMap<String,String>();
		ObjectMapper mapper = new ObjectMapper();
		map = mapper.readValue(str, new TypeReference<HashMap<String,String>>() {});

		return map;
		
	}

	//사용자 인증 토큰 조회
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
