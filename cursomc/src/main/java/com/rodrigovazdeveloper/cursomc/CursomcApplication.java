package com.rodrigovazdeveloper.cursomc;

import java.text.SimpleDateFormat;
import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.rodrigovazdeveloper.cursomc.domain.Categoria;
import com.rodrigovazdeveloper.cursomc.domain.Cidade;
import com.rodrigovazdeveloper.cursomc.domain.Cliente;
import com.rodrigovazdeveloper.cursomc.domain.Endereco;
import com.rodrigovazdeveloper.cursomc.domain.Estado;
import com.rodrigovazdeveloper.cursomc.domain.Pagamento;
import com.rodrigovazdeveloper.cursomc.domain.PagamentoComBoleto;
import com.rodrigovazdeveloper.cursomc.domain.PagamentoComCartao;
import com.rodrigovazdeveloper.cursomc.domain.Pedido;
import com.rodrigovazdeveloper.cursomc.domain.Produto;
import com.rodrigovazdeveloper.cursomc.domain.enuns.EstadoPagamento;
import com.rodrigovazdeveloper.cursomc.domain.enuns.TipoCliente;
import com.rodrigovazdeveloper.cursomc.repositories.CategoriaRepository;
import com.rodrigovazdeveloper.cursomc.repositories.CidadeRepository;
import com.rodrigovazdeveloper.cursomc.repositories.ClienteRepository;
import com.rodrigovazdeveloper.cursomc.repositories.EnderecoRepository;
import com.rodrigovazdeveloper.cursomc.repositories.EstadoRepository;
import com.rodrigovazdeveloper.cursomc.repositories.PagamentoRepository;
import com.rodrigovazdeveloper.cursomc.repositories.PedidoRepository;
import com.rodrigovazdeveloper.cursomc.repositories.ProdutoRepository;

@SpringBootApplication
public class CursomcApplication  implements CommandLineRunner {

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
	
	public static void main(String[] args) {
		SpringApplication.run(CursomcApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {

		// gravando dadsos automaticamente no banco de dados
		// criando instancias de categoria
		Categoria cat1 = new Categoria(null, "Informática");
		Categoria cat2 = new Categoria(null, "Escritório");
		
		// criando instancias de produto para gravação no banco de dados
		Produto p1  = new Produto(null, "Computador", 2000.00);
		Produto p2  = new Produto(null, "Impressora", 800.00);
		Produto p3  = new Produto(null, "Mouse", 80.00);	
			
		// SETTER DAS instancias de relacionamento entre categorias e produto M:N
		cat1.getProdutos().addAll(Arrays.asList(p1,p2,p3));
		cat2.getProdutos().addAll(Arrays.asList(p2));
		p1.getCategorias().add(cat1);
		p2.getCategorias().addAll(Arrays.asList(cat1, cat2));
		p3.getCategorias().add(cat1);
		
		Estado est1 = new Estado(null, "Minas Gerais");
		Estado est2 = new Estado(null, "São Paulo");
		
		Cidade c1 = new Cidade(null, "Uberlândia", est1);
		Cidade c2 = new Cidade(null, "São Paulo", est2);
		Cidade c3 = new Cidade(null, "Campinas", est2);
		
		est1.getCidades().addAll(Arrays.asList(c1));
		est2.getCidades().addAll(Arrays.asList(c2,c3));
		
		Cliente cli1 = new Cliente(null, "Maria Silva", "maria@gmail.com", "36378912377",TipoCliente.PESSOAFISICA);
		cli1.getTelefones().addAll(Arrays.asList("27363323", "93838393"));
		
		Endereco e1 = new Endereco(null, "Rua Flores", "300", "Apto 303", "Jardim", "38220834", cli1, c1);
		Endereco e2 = new Endereco(null, "Avenida matos", "105", "Sala 800", "Centro", "38772012", cli1, c2);
		
		cli1.getEnderecos().addAll(Arrays.asList(e1,e2));
		
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm");
		
		Pedido ped1 = new Pedido(null, sdf.parse("30/09/2019 10:36"),  cli1, e1);
		Pedido ped2 = new Pedido(null, sdf.parse("30/09/2019 10:36"),  cli1, e2);
		
		Pagamento pgto1 = new PagamentoComCartao(null, EstadoPagamento.QUITADO, ped1, 6);
		ped1.setPagamento(pgto1);
		Pagamento pgto2 = new PagamentoComBoleto(null, EstadoPagamento.PENDENTE, ped2, sdf.parse("20/10/2017 00:00"), null);
		ped2.setPagamento(pgto2);
		
		cli1.getPedidos().addAll(Arrays.asList(ped1,ped2));
		

	
		
		// preenchimento automatico das instâncias
		categoriaRepository.saveAll(Arrays.asList(cat1, cat2));
		produtoRepository.saveAll(Arrays.asList(p1,p2,p3));	
		estadoRepository.saveAll(Arrays.asList(est1, est2));
		cidadeRepository.saveAll(Arrays.asList(c1,c2,c3));
		clienteRepository.saveAll(Arrays.asList(cli1));
		enderecoRepository.saveAll(Arrays.asList(e1,e2));
		
		pedidoRepository.saveAll(Arrays.asList(ped1, ped2));
		pagamentoRepository.saveAll(Arrays.asList(pgto1,pgto2));	  
		
	}

}
