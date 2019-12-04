package com.rodrigovazdeveloper.cursomc.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rodrigovazdeveloper.cursomc.domain.Cidade;
import com.rodrigovazdeveloper.cursomc.domain.Cliente;
import com.rodrigovazdeveloper.cursomc.domain.Endereco;
import com.rodrigovazdeveloper.cursomc.domain.enuns.Perfil;
import com.rodrigovazdeveloper.cursomc.domain.enuns.TipoCliente;
import com.rodrigovazdeveloper.cursomc.dto.ClienteDTO;
import com.rodrigovazdeveloper.cursomc.dto.ClienteNewDTO;
import com.rodrigovazdeveloper.cursomc.repositories.ClienteRepository;
import com.rodrigovazdeveloper.cursomc.repositories.EnderecoRepository;
import com.rodrigovazdeveloper.cursomc.security.UserSS;
import com.rodrigovazdeveloper.cursomc.services.exceptions.AuthorizationException;
import com.rodrigovazdeveloper.cursomc.services.exceptions.DataIntegrityException;
import com.rodrigovazdeveloper.cursomc.services.exceptions.ObjectNotFoundException;


@Service
public class ClienteService  {

	@Autowired
	private ClienteRepository  repo;
	
	@Autowired
	private EnderecoRepository enderecoRepository;
	
	@Autowired
	private BCryptPasswordEncoder pe;
	
	public Cliente find(Integer id) throws ObjectNotFoundException {
		
		UserSS user = UserService.authenticatted();
		
		if (user == null || !user.hasRole(Perfil.ADMIN) && !id.equals(user.getId())) {
			System.out.println(user == null);
			System.out.println(!user.hasRole(Perfil.ADMIN));
			System.out.println(!id.equals(user.getId()));
			throw new AuthorizationException("Acesso negado");
		}
		
		Optional<Cliente> obj = repo.findById(id);
		return obj.orElseThrow(() -> new ObjectNotFoundException(
				"Objeto não encontrado! Id " + id + ", Tipo: " + Cliente.class.getName()
				));
	}
	
	
	@Transactional  
	public Cliente insert(Cliente obj) {
		
		obj.setId(null);
		obj = repo.save(obj);
		enderecoRepository.saveAll(obj.getEnderecos());
		return obj;
		
	}
	
	public Cliente update(Cliente obj) {
		Cliente newObj = find(obj.getId());
		updateData(newObj, obj);
		return repo.save(newObj);
	}
	
	private void updateData(Cliente newObj, Cliente obj) {
		// TODO Auto-generated method stub
		
		newObj.setNome(obj.getNome());
		newObj.setEmail(obj.getEmail());
		
	}


	public void delete(Integer id) {
		find(id);
		
		try {
			repo.deleteById(id);
		}catch(DataIntegrityViolationException e) {
			throw new DataIntegrityException("Não é possível excluir um cliente que possui pedidos");
		}
		
	}
	
	public List<Cliente> findAll() {
		return repo.findAll();
	}
	
	public Page<Cliente> findPage(Integer page, Integer LinesPerPage, String direction, String orderBy) {
		PageRequest pageRequest = PageRequest.of(page, LinesPerPage, Direction.valueOf(direction), orderBy );
		return repo.findAll(pageRequest);
	}
	
	public Cliente fromDto(ClienteNewDTO objDto) {
		
		Cliente cli = new Cliente(null, objDto.getNome(), objDto.getEmail(), objDto.getCpfOuCnpj(), TipoCliente.toEnum(objDto.getTipo()), pe.encode(objDto.getSenha()));
		Cidade cid = new Cidade(objDto.getCidadeId(), null, null);
		Endereco end = new Endereco(null, objDto.getLogradouro(), objDto.getNumero(),objDto.getComplemento(),objDto.getBairro(),objDto.getCep(),cli, cid);
		
		cli.getEnderecos().add(end);
		cli.getTelefones().add(objDto.getTelefone1());
		
		if (objDto.getTelefone2() != null)
			cli.getTelefones().add(objDto.getTelefone2());
		
		if (objDto.getTelefone3() != null)
			cli.getTelefones().add(objDto.getTelefone3());
		
		return cli;
	}
	
	public Cliente fromDto(ClienteDTO objDto) {
		return new Cliente(objDto.getId(), objDto.getNome(), objDto.getEmail(), null, null, null);
	}
	

	
	
}
