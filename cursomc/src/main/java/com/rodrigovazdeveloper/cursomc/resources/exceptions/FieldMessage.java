package com.rodrigovazdeveloper.cursomc.resources.exceptions;

import java.io.Serializable;

public class FieldMessage implements Serializable {

	private static final long serialVersionUID = 1L;

	private String FieldName;
	private String message;
	
	public FieldMessage() {
		super();
	}

	public FieldMessage(String filedName, String message) {
		super();
		this.FieldName = filedName;
		this.message = message;
	}

	public String getFiledName() {
		return FieldName;
	}

	public void setFiledName(String filedName) {
		this.FieldName = filedName;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	
	
}
