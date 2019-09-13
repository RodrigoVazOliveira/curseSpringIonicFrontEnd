package com.rodrigovazdeveloper.cursomc.domain;

import javax.persistence.Entity;

import com.rodrigovazdeveloper.cursomc.domain.enuns.EstadoPagamento;

@Entity
public class PagamentoComCartao extends Pagamento {

	private static final long serialVersionUID = 1L;
	
	private Integer NumeroDeParcela;
	
	public PagamentoComCartao() {
		super();
	}

	public PagamentoComCartao(Integer id, EstadoPagamento estado, Pedido pedido, Integer numeroDeParcela) {
		super(id, estado, pedido);
		this.NumeroDeParcela = numeroDeParcela;
	}

	public Integer getNumeroDeParcela() {
		return NumeroDeParcela;
	}

	public void setNumeroDeParcela(Integer numeroDeParcela) {
		NumeroDeParcela = numeroDeParcela;
	}
	
	
}
