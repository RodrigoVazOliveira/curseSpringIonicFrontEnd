package com.rodrigovazdeveloper.cursomc.security;

import java.util.Collection;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.rodrigovazdeveloper.cursomc.domain.enuns.Perfil;

public class UserSS implements UserDetails {

	private static final long serialVersionUID = 1L;

	private Integer id;
	private String email;
	private String senha;
	private Collection<? extends GrantedAuthority> authorities;
	
	
	
	public UserSS() {
		super();
	}

	
	
	public UserSS(Integer id, String email, String senha, Set<Perfil> authorities) {
		super();
		this.id = id;
		this.email = email;
		this.senha = senha;
		this.authorities = authorities.stream().map(x -> new SimpleGrantedAuthority(x.getDescricacao())).collect(Collectors.toList());
	}



	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}

	@Override
	public String getPassword() {
		return senha;
	}

	@Override
	public String getUsername() {
		return email;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}
	
	public Integer getId() {
		return id;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}
	
	public boolean hasRole(Perfil perfil) {
		return getAuthorities().contains(new SimpleGrantedAuthority(perfil.getDescricacao()));
	}

}
