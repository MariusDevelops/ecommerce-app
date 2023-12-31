package com.server.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.server.server.models.Item;

/**
 * Repository interface for Item entity providing CRUD operations.
 */
@Repository
public interface ItemRepository extends JpaRepository<Item, Integer> {
}