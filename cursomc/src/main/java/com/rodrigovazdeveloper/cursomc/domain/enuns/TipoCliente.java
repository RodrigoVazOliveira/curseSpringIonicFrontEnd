package com.rodrigovazdeveloper.cursomc.domain.enuns;

public enum TipoCliente {
	
	PESSOAFISICA(1, "Pessoa física"),
	PESSOAJURIDICA(2, "Pessoa jurídica");
	
	private Integer cod;
	private String descricacao;
	
	private TipoCliente(Integer cod, String descricacao) {
		this.cod = cod;
		this.descricacao = descricacao;
	}
	
	public Integer getCod() {
		return this.cod;
	}
	
	public String getDescricacao() {
		return this.descricacao;
	}
	
	public static TipoCliente toEnum(Integer cod) {
		
		if (cod == null)
			return null;
		
		for (TipoCliente x: TipoCliente.values()) {
			
			if (cod.equals(x.getCod()))
				return x;

		}
		
		throw  new IllegalArgumentException("Id inválido!   " + cod);
	}
}
