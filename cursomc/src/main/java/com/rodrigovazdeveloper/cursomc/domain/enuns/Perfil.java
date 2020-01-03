package com.rodrigovazdeveloper.cursomc.domain.enuns;

public enum Perfil {
	
	ADMIN(1, "ROLE_ADMIN"),
	CLIENTE(2, "ROLE_CLIENTE");
	
	private Integer cod;
	private String descricacao;
	
	private Perfil(Integer cod, String descricacao) {
		this.cod = cod;
		this.descricacao = descricacao;
	}
	
	public Integer getCod() {
		return this.cod;
	}
	
	public String getDescricacao() {
		return this.descricacao;
	}
	
	
	public static Perfil toEnum(Integer cod) {
		
		if (cod == null)
			return null;
		
		for (Perfil x: Perfil.values()) {
			
			if (cod.equals(x.getCod()))
				return x;

		}
		
		throw  new IllegalArgumentException("Id inválido!   " + cod);
	}
}
