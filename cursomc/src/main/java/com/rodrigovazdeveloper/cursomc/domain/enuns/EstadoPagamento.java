package com.rodrigovazdeveloper.cursomc.domain.enuns;

public enum EstadoPagamento {
	
	PENDENTE(1, "Pendente"),
	QUITADO(2, "Quitado"),
	CANCELADO(3, "Cancelado");
	
	private Integer cod;
	private String descricacao;
	
	private EstadoPagamento(Integer cod, String descricacao) {
		this.cod = cod;
		this.descricacao = descricacao;
	}
	
	public Integer getCod() {
		return this.cod;
	}
	
	public String getDescricacao() {
		return this.descricacao;
	}
	
	
	public static EstadoPagamento toEnum(Integer cod) {
		
		if (cod == null)
			return null;
		
		for (EstadoPagamento x: EstadoPagamento.values()) {
			
			if (cod.equals(x.getCod()))
				return x;

		}
		
		throw  new IllegalArgumentException("Id inválido!   " + cod);
	}
}
