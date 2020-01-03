package com.rodrigovazdeveloper.cursomc.resources.utils;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.List;

public class URL {

	public static List<Integer> decodeIntList(String s) {
		
		String[] vet = s.split(",");
		
		Integer sizeVet = vet.length;
		
		List<Integer> list = new ArrayList<>();
		
		for (Integer i = 0; i < sizeVet; i++) 
			list.add(Integer.parseInt(vet[i]));
		
		
		return list;
		
	}
	
	
	public static String decodeParam(String s) {
		try {
			return URLDecoder.decode(s, "UTF-8");
		} catch (UnsupportedEncodingException e) {
			return "";
		}
	}
}
