package com.tdkng.snug;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

/**
 * Integration test for Spring Boot application context loading.
 * 
 * Uses the "test" profile which:
 * - Uses H2 in-memory database
 * - Provides test configurations for all required properties
 * - Isolates tests from production dependencies
 */
@SpringBootTest
@ActiveProfiles("test")
class SnugApplicationTests {

	@Test
	void contextLoads() {
		// This test verifies that the Spring application context loads successfully
		// with all beans properly configured
	}

}
