package servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

@WebServlet("/step09/test06")
public class Test06Servlet extends HttpServlet{
	
//	@Override
//	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
//			throws ServletException, IOException {
//		System.out.println("get 요청!");
//	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		System.out.println("post 요청!");
		// post 요청으로 들어오는 한글 파라미터는 다음과 같이 
		// getParameter를 호출하기전에 문자셋을 지정해주어야된다.
		req.setCharacterEncoding("utf-8");
		
		String name= req.getParameter("name");
		String age = req.getParameter("age");
		
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("name", name);
		map.put("age", age);
		
		resp.setContentType("text/plain;charset=utf-8");
		PrintWriter out = resp.getWriter();
		String jsonString = new Gson().toJson(map);
		System.out.println(jsonString);
		
		out.println(new Gson().toJson(map));
	}
// LifeCycle	
//	
//	@Override
//	public void init() throws ServletException {
//		super.init();
//	}
//	@Override
//	protected void service(HttpServletRequest arg0, HttpServletResponse arg1)
//			throws ServletException, IOException {
//		super.service(arg0, arg1);
//	}
//	
//	@Override
//	public void destroy() {
//		super.destroy();
//	}
}
