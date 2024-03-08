/*
 * Generated by the Jasper component of Apache Tomcat
 * Version: Apache Tomcat/8.5.56
 * Generated at: 2024-03-07 11:16:02 UTC
 * Note: The last modified time of this file was set to
 *       the last modified time of the source file after
 *       generation to assist with modification tracking.
 */
package org.apache.jsp.adminconsole;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;
import java.util.Date;
import java.util.Calendar;
import java.text.SimpleDateFormat;
import java.text.DateFormat;

public final class designationMaster_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent,
                 org.apache.jasper.runtime.JspSourceImports {

  private static final javax.servlet.jsp.JspFactory _jspxFactory =
          javax.servlet.jsp.JspFactory.getDefaultFactory();

  private static java.util.Map<java.lang.String,java.lang.Long> _jspx_dependants;

  private static final java.util.Set<java.lang.String> _jspx_imports_packages;

  private static final java.util.Set<java.lang.String> _jspx_imports_classes;

  static {
    _jspx_imports_packages = new java.util.HashSet<>();
    _jspx_imports_packages.add("javax.servlet");
    _jspx_imports_packages.add("javax.servlet.http");
    _jspx_imports_packages.add("javax.servlet.jsp");
    _jspx_imports_classes = new java.util.HashSet<>();
    _jspx_imports_classes.add("java.util.Calendar");
    _jspx_imports_classes.add("java.util.Date");
    _jspx_imports_classes.add("java.text.SimpleDateFormat");
    _jspx_imports_classes.add("java.text.DateFormat");
  }

  private volatile javax.el.ExpressionFactory _el_expressionfactory;
  private volatile org.apache.tomcat.InstanceManager _jsp_instancemanager;

  public java.util.Map<java.lang.String,java.lang.Long> getDependants() {
    return _jspx_dependants;
  }

  public java.util.Set<java.lang.String> getPackageImports() {
    return _jspx_imports_packages;
  }

  public java.util.Set<java.lang.String> getClassImports() {
    return _jspx_imports_classes;
  }

  public javax.el.ExpressionFactory _jsp_getExpressionFactory() {
    if (_el_expressionfactory == null) {
      synchronized (this) {
        if (_el_expressionfactory == null) {
          _el_expressionfactory = _jspxFactory.getJspApplicationContext(getServletConfig().getServletContext()).getExpressionFactory();
        }
      }
    }
    return _el_expressionfactory;
  }

  public org.apache.tomcat.InstanceManager _jsp_getInstanceManager() {
    if (_jsp_instancemanager == null) {
      synchronized (this) {
        if (_jsp_instancemanager == null) {
          _jsp_instancemanager = org.apache.jasper.runtime.InstanceManagerFactory.getInstanceManager(getServletConfig());
        }
      }
    }
    return _jsp_instancemanager;
  }

  public void _jspInit() {
  }

  public void _jspDestroy() {
  }

  public void _jspService(final javax.servlet.http.HttpServletRequest request, final javax.servlet.http.HttpServletResponse response)
      throws java.io.IOException, javax.servlet.ServletException {

    final java.lang.String _jspx_method = request.getMethod();
    if (!"GET".equals(_jspx_method) && !"POST".equals(_jspx_method) && !"HEAD".equals(_jspx_method) && !javax.servlet.DispatcherType.ERROR.equals(request.getDispatcherType())) {
      response.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED, "JSPs only permit GET, POST or HEAD. Jasper also permits OPTIONS");
      return;
    }

    final javax.servlet.jsp.PageContext pageContext;
    javax.servlet.http.HttpSession session = null;
    final javax.servlet.ServletContext application;
    final javax.servlet.ServletConfig config;
    javax.servlet.jsp.JspWriter out = null;
    final java.lang.Object page = this;
    javax.servlet.jsp.JspWriter _jspx_out = null;
    javax.servlet.jsp.PageContext _jspx_page_context = null;


    try {
      response.setContentType("text/html; charset=ISO-8859-1");
      pageContext = _jspxFactory.getPageContext(this, request, response,
      			null, true, 8192, true);
      _jspx_page_context = pageContext;
      application = pageContext.getServletContext();
      config = pageContext.getServletConfig();
      session = pageContext.getSession();
      out = pageContext.getOut();
      _jspx_out = out;

      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("<head>\r\n");
      out.write("<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css\">\r\n");
      out.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"https://cdn.datatables.net/v/bs4/dt-1.10.21/datatables.min.css\"/>\r\n");
      out.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"./css/common.css\"/>\r\n");
      out.write(" \r\n");
      out.write("<script type=\"text/javascript\" src=\"https://cdn.datatables.net/v/bs4/dt-1.10.21/datatables.min.js\"></script>\r\n");
      out.write("\r\n");
      out.write("</head>\r\n");

Date date = Calendar.getInstance().getTime();
DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
String strDate = dateFormat.format(date);

Calendar c = Calendar.getInstance();
c.setTime(date);
c.add(Calendar.YEAR, 10);
Date futureDate = c.getTime();
String strFutureDate = dateFormat.format(futureDate);

      out.write("\r\n");
      out.write("\r\n");
      out.write("<div class=\"container container-background\" id=\"designationListDiv\">\r\n");
      out.write("<div class=\"main-wrap-div\">\r\n");
      out.write("\t<div class=\"row form-group\">\r\n");
      out.write("\t<div class=\"col-md-12\">\r\n");
      out.write("\t<nav>\r\n");
      out.write("\t    <ol class=\"breadcrumb\">\r\n");
      out.write("\t        <li class=\"breadcrumb-item\"><b>Master Screen</b></li>\r\n");
      out.write("\t        <li class=\"breadcrumb-item active\"><b>Designation Master</b></li>\r\n");
      out.write("\t    </ol>\r\n");
      out.write("\t</nav>\r\n");
      out.write("\t</div>\r\n");
      out.write("\t</div>\r\n");
      out.write("\t<div class=\"row form-group\">\r\n");
      out.write("\t\t<div class=\"col-md-6\"><p class=\"main-wrap-header\">Designation Master</p></div>\r\n");
      out.write("\t\t<div class=\"col-md-6 text-right\" >\r\n");
      out.write("\t\t\t\t<button type=\"button\" class=\"btn btn-primary\" id=\"addDesignationBtnId\" style=\"display: none;\">\r\n");
      out.write("\t\t\t\t\t\t<i class=\"glyphicon glyphicon-plus-sign\"></i>\r\n");
      out.write("\t\t\t\t\t\tAdd Designation\r\n");
      out.write("\t\t\t\t\t</button>\r\n");
      out.write("\t\t\t</div>\r\n");
      out.write("\t\t</div>\r\n");
      out.write("\r\n");
      out.write("\t<div class=\"row\">\r\n");
      out.write("\t\t<div class=\"form-group col-md-12 responsive-table\" id=\"designationListSearchTableDiv\">\r\n");
      out.write("\t\t\t<table id=\"designationListSearchTable\" class=\"table table-striped table-bordered table-sm\" cellspacing=\"0\" width=\"100%\">\r\n");
      out.write("\t\t\t\t<thead>\r\n");
      out.write("\t\t\t\t\t<tr>\r\n");
      out.write("\t\t\t\t\t\t<th>Designation Name</th>\t\t\t\t\t\r\n");
      out.write("\t\t\t\t\t\t<th>Designation Code</th>\r\n");
      out.write("\t\t\t\t\t\t<th>Designation Status</th>\r\n");
      out.write("\t\t\t\t\t\t<th width=\"10%\">Action</th>\r\n");
      out.write("\t\t\t\t\t</tr>\r\n");
      out.write("\t\t\t\t</thead>\r\n");
      out.write("\t\t\t\t<tbody>\r\n");
      out.write("\t\t\t\t\r\n");
      out.write("\t\t\t\t</tbody>\t\t\t\r\n");
      out.write("\t\t\t</table>\r\n");
      out.write("\t\t</div>\r\n");
      out.write("\t</div>\r\n");
      out.write("\t</div>\r\n");
      out.write("</div>\r\n");
      out.write("\r\n");
      out.write("<!-- Add Designation Modal -->\r\n");
      out.write("  <div class=\"modal fade\" id=\"addDesignationModal\" role=\"dialog\">\r\n");
      out.write("    <div class=\"modal-dialog modal-lg\">\r\n");
      out.write("    \r\n");
      out.write("      <!-- Modal content-->\r\n");
      out.write("      <div class=\"modal-content\">\r\n");
      out.write("        <div class=\"modal-header\">\r\n");
      out.write("          <h4 class=\"modal-title\" id=\"modelTitleDesignation\"></h4>\r\n");
      out.write("          <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>     \r\n");
      out.write("        </div>\r\n");
      out.write("        <div class=\"error-messages-scroll\" id=\"addDesignationErrorDiv\" style=\"padding: 0rem 1rem;\"></div>\r\n");
      out.write("        <div class=\"modal-body modal-body-scroll\">         \r\n");
      out.write("    \r\n");
      out.write("     <form method=\"POST\" rel=\"form\" novalidate id=\"addDesignationFormId\" enctype=\"multipart/formdata\" >\r\n");
      out.write("    \r\n");
      out.write("    <input type=\"hidden\" id=\"designationMasterId\">\r\n");
      out.write("    \r\n");
      out.write("    <div class=\"form-group row\">\r\n");
      out.write("\t    <label for=\"inputDesignationName\" class=\"col-sm-4 col-form-label\">Designation Name*:</label>\r\n");
      out.write("\t    <div class=\"col-sm-8\">\r\n");
      out.write("\t       <input type=\"text\" class=\"form-control\" maxlength=\"100\" id=\"designationNameId\" placeholder=\"Designation Name\" required/>\r\n");
      out.write("\t    </div>\r\n");
      out.write("  \t</div>\r\n");
      out.write("  \t\r\n");
      out.write("  \t<div class=\"form-group row\">\r\n");
      out.write("\t    <label for=\"inputDesignationCode\" class=\"col-sm-4 col-form-label\">Designation Code:</label>\r\n");
      out.write("\t    <div class=\"col-sm-8\">\r\n");
      out.write("\t       <input type=\"text\" class=\"form-control\" maxlength=\"100\" id=\"designationCodeId\" placeholder=\"Designation Code\" required/>\r\n");
      out.write("\t    </div>\r\n");
      out.write("  \t</div>\r\n");
      out.write("  \t\r\n");
      out.write("\t <div class=\"form-group row\" id=\"activeStatusIdDiv\" style=\"display: none;\">\r\n");
      out.write("\t    <label for=\"inputActiveStatusId\" class=\"col-sm-4 col-form-label\">Status:</label>\r\n");
      out.write("\t    <div class=\"col-sm-8 text-align-left\">\r\n");
      out.write("\t    \t&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\r\n");
      out.write("\t\t\t<input class=\"form-check-input\" type=\"checkbox\" name=\"activeStatus\" id=\"activeStatusId\">\r\n");
      out.write("\t\t\t&nbsp;&nbsp;&nbsp;\r\n");
      out.write("\t\t\t<label class=\"form-check-label\" for=\"activeStatus\">\r\n");
      out.write("\t \t\t\tActive </label>\r\n");
      out.write("\t    </div>\r\n");
      out.write("\t  </div> \r\n");
      out.write("  \t\r\n");
      out.write(" \t</form>  \r\n");
      out.write("   </div>\r\n");
      out.write("   \r\n");
      out.write("   \r\n");
      out.write("  <div class=\"modal-footer text-align-center\" id=\"addDesignationBtnDiv\" style=\"display: none;\">\r\n");
      out.write("    <button type=\"button\" class=\"btn btn-primary\" onclick=\"addNewDesignation()\">Save</button>\r\n");
      out.write("    <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\r\n");
      out.write("  </div>\r\n");
      out.write("  \r\n");
      out.write("  <div class=\"modal-footer text-align-center\" id=\"updateDesignationBtnDiv\" style=\"display: none;\">\r\n");
      out.write("    <button type=\"button\" class=\"btn btn-primary\" onclick=\"updateDesignation()\">Update</button>\r\n");
      out.write("    <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\r\n");
      out.write("  </div>\r\n");
      out.write("\r\n");
      out.write("   \r\n");
      out.write("\r\n");
      out.write("      </div>\r\n");
      out.write("      \r\n");
      out.write("    </div>\r\n");
      out.write("  </div>\r\n");
      out.write("  \r\n");
      out.write("  \r\n");
      out.write("\r\n");
      out.write(" \r\n");
      out.write("<div id=\"loader\" class=\"loading-holder\">\r\n");
      out.write("  <img id=\"loading-image\" class=\"loading-image\" src=\"images/modal-loader.gif\" alt=\"Loading...\" />\r\n");
      out.write("</div>\r\n");
      out.write("\r\n");
      out.write("<script src=\"./js/designationMaster.js\"></script>\r\n");
      out.write("<script src=\"./js/utility.js\"></script>");
    } catch (java.lang.Throwable t) {
      if (!(t instanceof javax.servlet.jsp.SkipPageException)){
        out = _jspx_out;
        if (out != null && out.getBufferSize() != 0)
          try {
            if (response.isCommitted()) {
              out.flush();
            } else {
              out.clearBuffer();
            }
          } catch (java.io.IOException e) {}
        if (_jspx_page_context != null) _jspx_page_context.handlePageException(t);
        else throw new ServletException(t);
      }
    } finally {
      _jspxFactory.releasePageContext(_jspx_page_context);
    }
  }
}