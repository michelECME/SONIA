package com.etecsa.cu.repository;

import com.etecsa.cu.domain.Ropa;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Ropa entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RopaRepository extends JpaRepository<Ropa, Long> {
}
