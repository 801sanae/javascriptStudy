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
public class Test06Servlet extends HttpServlet {
  @Override
  protected void doPost(HttpServletRequest req, HttpServletResponse resp)
      throws ServletException, IOException {
    req.setCharacterEncoding("UTF-8");
    String name = req.getParameter("name");
    String age = req.getParameter("age");
    
    HashMap<String,Object> map = new HashMap<String,Object>();
    map.put("name", name);
    map.put("age", age);
    
    resp.setContentType("text/plain;charset=UTF-8");
    PrintWriter out = resp.getWriter();
    
    String jsonString = new Gson().toJson(map);
    System.out.println(jsonString);
    
    out.println(jsonString);
  }
}
