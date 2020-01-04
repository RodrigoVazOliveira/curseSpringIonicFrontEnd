package com.rodrigovazdeveloper.cursomc.services;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.rodrigovazdeveloper.cursomc.domain.Categoria;
import com.rodrigovazdeveloper.cursomc.domain.Cidade;
import com.rodrigovazdeveloper.cursomc.domain.Cliente;
import com.rodrigovazdeveloper.cursomc.domain.Endereco;
import com.rodrigovazdeveloper.cursomc.domain.Estado;
import com.rodrigovazdeveloper.cursomc.domain.ItemPedido;
import com.rodrigovazdeveloper.cursomc.domain.Pagamento;
import com.rodrigovazdeveloper.cursomc.domain.PagamentoComBoleto;
import com.rodrigovazdeveloper.cursomc.domain.PagamentoComCartao;
import com.rodrigovazdeveloper.cursomc.domain.Pedido;
import com.rodrigovazdeveloper.cursomc.domain.Produto;
import com.rodrigovazdeveloper.cursomc.domain.enuns.EstadoPagamento;
import com.rodrigovazdeveloper.cursomc.domain.enuns.Perfil;
import com.rodrigovazdeveloper.cursomc.domain.enuns.TipoCliente;
import com.rodrigovazdeveloper.cursomc.repositories.CategoriaRepository;
import com.rodrigovazdeveloper.cursomc.repositories.CidadeRepository;
import com.rodrigovazdeveloper.cursomc.repositories.ClienteRepository;
import com.rodrigovazdeveloper.cursomc.repositories.EnderecoRepository;
import com.rodrigovazdeveloper.cursomc.repositories.EstadoRepository;
import com.rodrigovazdeveloper.cursomc.repositories.ItemPedidoRepository;
import com.rodrigovazdeveloper.cursomc.repositories.PagamentoRepository;
import com.rodrigovazdeveloper.cursomc.repositories.PedidoRepository;
import com.rodrigovazdeveloper.cursomc.repositories.ProdutoRepository;

@Service
public class DbService {

	@Autowired
	private CategoriaRepository categoriaRepository;
	
	@Autowired
	private ProdutoRepository produtoRepository;
	
	@Autowired
	private EstadoRepository estadoRepository;
	
	@Autowired
	private CidadeRepository cidadeRepository;
	
	@Autowired
	private EnderecoRepository enderecoRepository;
	
	@Autowired
	private ClienteRepository clienteRepository;
	
	@Autowired
	private PedidoRepository pedidoRepository;
	
	@Autowired
	private PagamentoRepository pagamentoRepository;
	
	@Autowired
	private ItemPedidoRepository itemPedidoRepository;
	
	@Autowired
	private BCryptPasswordEncoder pe;
	
	
	public void instatiateDatabase() throws ParseException {
		
		// gravando dadsos automaticamente no banco de dados
				// criando instancias de categoria
				Categoria cat1 = new Categoria(null, "Informática");
				Categoria cat2 = new Categoria(null, "Escritório");
				Categoria cat3 = new Categoria(null, "Cama mesa e banho");
				Categoria cat4 = new Categoria(null, "sEletrônico");
				Categoria cat5 = new Categoria(null, "Jardinagem");
				Categoria cat6 = new Categoria(null, "Decoração");
				Categoria cat7 = new Categoria(null, "Perfumari");
				
				
				// criando instancias de produto para gravação no banco de dados
				Produto p1  = new Produto(null, "Computador", 2000.00);
				Produto p2  = new Produto(null, "Impressora", 800.00);
				Produto p3  = new Produto(null, "Mouse", 80.00);	
				Produto p4  = new Produto(null, "Mesa de escritório", 300.00);
				Produto p5  = new Produto(null, "Toalha", 50.00);
				Produto p6  = new Produto(null, "Colchão", 200.00);
				Produto p7  = new Produto(null, "TV True Color", 1200.00);
				Produto p8  = new Produto(null, "Roçadeira", 800.00);
				Produto p9  = new Produto(null, "Pendente", 180.00);
				Produto p10  = new Produto(null, "Abajour", 100.00);
				Produto p11 = new Produto(null, "Shampoo", 80.00);
				
				
				// SETTER DAS instancias de relacionamento entre categorias e produto M:N
				cat1.getProdutos().addAll(Arrays.asList(p1,p2,p3));
				cat2.getProdutos().addAll(Arrays.asList(p2,p4));
				cat3.getProdutos().addAll(Arrays.asList(p5,p6));
				cat4.getProdutos().addAll(Arrays.asList(p1,p2,p3,p7));
				cat5.getProdutos().addAll(Arrays.asList(p8));
				cat6.getProdutos().addAll(Arrays.asList(p9,p10));
				cat7.getProdutos().addAll(Arrays.asList(p11));
				
				p1.getCategorias().addAll(Arrays.asList(cat1, cat4));
				p2.getCategorias().addAll(Arrays.asList(cat1, cat2, cat4));
				p3.getCategorias().addAll(Arrays.asList(cat1, cat4));
				p4.getCategorias().addAll(Arrays.asList(cat2));
				p5.getCategorias().addAll(Arrays.asList(cat3));
				p6.getCategorias().addAll(Arrays.asList(cat3));
				p7.getCategorias().addAll(Arrays.asList(cat4));
				p8.getCategorias().addAll(Arrays.asList(cat5));
				p9.getCategorias().addAll(Arrays.asList(cat6));
				p10.getCategorias().addAll(Arrays.asList(cat6));
				p11.getCategorias().addAll(Arrays.asList(cat7));
				
				Estado est1 = new Estado(null, "Minas Gerais");
				Estado est2 = new Estado(null, "São Paulo");
				
				Cidade c1 = new Cidade(null, "Uberlândia", est1);
				Cidade c2 = new Cidade(null, "São Paulo", est2);
				Cidade c3 = new Cidade(null, "Campinas", est2);
				
				est1.getCidades().addAll(Arrays.asList(c1));
				est2.getCidades().addAll(Arrays.asList(c2,c3));
				
				Cliente cli1 = new Cliente(null, "Maria Silva", "rodrigovazdeoliveira@gmail.com", "36378912377",TipoCliente.PESSOAFISICA, pe.encode("123"));
				cli1.getTelefones().addAll(Arrays.asList("27363323", "93838393"));
				
				Cliente cli2 = new Cliente(null, "Ana Costa", "raindev.r@gmail.com", "08625405002",TipoCliente.PESSOAFISICA, pe.encode("123"));
				cli2.addPerfil(Perfil.ADMIN);
				
				Endereco e1 = new Endereco(null, "Rua Flores", "300", "Apto 303", "Jardim", "38220834", cli1, c1);
				Endereco e2 = new Endereco(null, "Avenida matos", "105", "Sala 800", "Centro", "38772012", cli1, c2);
				Endereco e3 = new Endereco(null, "Avenida floriano", "105", "Sala 800", "Centro", "38772012", cli2, c2);
				
				cli2.getEnderecos().add(e3);
				
				cli1.getEnderecos().addAll(Arrays.asList(e1,e2));
				
				SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm");
				
				Pedido ped1 = new Pedido(null, sdf.parse("30/09/2019 10:36"),  cli1, e1);
				Pedido ped2 = new Pedido(null, sdf.parse("30/09/2019 10:36"),  cli1, e2);
				
				Pagamento pgto1 = new PagamentoComCartao(null, EstadoPagamento.QUITADO, ped1, 6);
				ped1.setPagamento(pgto1);
				Pagamento pgto2 = new PagamentoComBoleto(null, EstadoPagamento.PENDENTE, ped2, sdf.parse("20/10/2017 00:00"), null);
				ped2.setPagamento(pgto2);
				
				cli1.getPedidos().addAll(Arrays.asList(ped1,ped2));
				
				ItemPedido ip1 = new ItemPedido(ped1, p1, 0.00, 1, 2000.00);
				ItemPedido ip2 = new ItemPedido(ped1, p3, 0.00, 2, 80.00);
				ItemPedido ip3 = new ItemPedido(ped2, p2, 100.00, 1, 800.00);
				
				ped1.getItens().addAll(Arrays.asList(ip1, ip2));
				ped2.getItens().addAll(Arrays.asList(ip3));
				
				p1.getItens().addAll(Arrays.asList(ip1));
				p2.getItens().addAll(Arrays.asList(ip3));
				p3.getItens().addAll(Arrays.asList(ip2));
				
				// preenchimento automatico das instâncias
				categoriaRepository.saveAll(Arrays.asList(cat1, cat2, cat3, cat4, cat5, cat6, cat7));
				produtoRepository.saveAll(Arrays.asList(p1,p2,p3,p4,p5,p6,p7,p8,p9,p10, p11));	
				estadoRepository.saveAll(Arrays.asList(est1, est2));
				cidadeRepository.saveAll(Arrays.asList(c1,c2,c3));
				clienteRepository.saveAll(Arrays.asList(cli1, cli2));
				enderecoRepository.saveAll(Arrays.asList(e1,e2, e3));
				
				pedidoRepository.saveAll(Arrays.asList(ped1, ped2));
				pagamentoRepository.saveAll(Arrays.asList(pgto1,pgto2));	
				
				itemPedidoRepository.saveAll(Arrays.asList(ip1, ip2, ip3));
		
	}
	
}